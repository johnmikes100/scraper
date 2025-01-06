from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
from openai import OpenAI
from urllib.parse import urljoin
import json
import configparser
import os


app = Flask(__name__)
CORS(app, resources={r"/scrape*": {"origins": "http://localhost:3000", "allow_headers": ["Content-Type"], "supports_credentials": True}})

@app.route('/scrape', methods=['POST'])

#The scraper takes in a list of happy hours from the text input and then passes each link through beautiful soup to extract html content. From here a prompt is given to the gpt-4o model to write out the happy hours. This text is then converted into a json file.
def scrape_urls():
    data = request.json
    urls = data['urls']
    urls = [ensure_https(url) for url in urls]
    output = [find_hh(url) for url in urls]
    print("gets to output")
    restaurants = {}
    for index,restaurant in enumerate(output):
        restaurant_key = f"Restaurant{index+1}"
        restaurants[restaurant_key] = parse_hours(restaurant)
    
    restaurants_json = json.dumps(restaurants, indent=4)

    return (restaurants_json)
    

def ensure_https(url):
    if not url.startswith('http://') and not url.startswith('https://'):
        return 'https://' + url
    return url

def find_hh(url):
    try:
        print("gets here")
        response = requests.get(url)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        for tag in soup.find_all():
            if tag.parent is not None:
                tag.unwrap()
        text_content = soup.get_text(separator='\n', strip=True)
        print(text_content)
        output = send_to_gpt(text_content)
        return output
    except requests.RequestException as e:
        return f"Error making request to {url}: {str(e)}"
    except Exception as e:
        return f"An error occurred while parsing {url}: {str(e)}"

def send_to_gpt(content):
    client = OpenAI(
    api_key = os.getenv('OPENAI_API_KEY')
)
    prompt_text = f'For each day of the week, write the corresponding happy hour right next to it after one space (Monday 5:30-11:30PM, always use minutes). Put each of the 7 days of the week on a new line. Do not include any extra text and if a happy hour is not there put None for the time\n{content}'
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": prompt_text,
            }
        ],
        model="gpt-4o",
       
    )
    
    result = chat_completion.choices[0].message.content  # Make sure the keys are accessed correctly
    print("Response received from OpenAI.")
    return result


def parse_hours(info):
    hours = {}
    scheduleText = info.strip().split('\n')
    for line in scheduleText:
        day, time = line.split(' ', 1)
        hours[day] = time.strip()
    return hours


if __name__ == "__main__":
    print("Starting the Flask server for the scraper app...")
    app.run(debug=True, port=5000)