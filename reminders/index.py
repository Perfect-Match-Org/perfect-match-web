import os
import boto3
import json
import time

# Load environment variables from .env file
from dotenv import load_dotenv

load_dotenv()

# Set up SES client
ses = boto3.client(
    "ses",
    region_name="us-east-1",
    aws_access_key_id=os.environ.get("ACCESS_KEY_ID"),
    aws_secret_access_key=os.environ.get("SECRET_ACCESS_KEY"),
)


def users():
    users = []
    with open("./everyone.json") as f:
        data = json.load(f)
        for user in data:
            users.append(user["email"])
    return filter_emails(users)


def admins():
    admins = []
    with open("./admins.json") as f:
        data = json.load(f)
        for admin in data:
            admins.append(admin["email"])
    return filter_emails(admins)


def filter_emails(emails):
    return list(set(emails))


def send_emails(to_addresses, subject, body):
    for i in range(840, len(to_addresses), 30):
        params = {
            "Destination": {"BccAddresses": to_addresses[i : i + 30]},
            "Message": {
                "Body": {"Html": {"Charset": "UTF-8", "Data": body}},
                "Subject": {"Charset": "UTF-8", "Data": subject},
            },
            "Source": "noreply@perfectmatch.ai",
            "ReplyToAddresses": ["cornell.perfectmatch@gmail.com"],
        }
        try:
            response = ses.send_email(**params)
            print(f"Email sent to {i} -> {i+30}")
        except Exception as e:
            print(f"Waiting for some time...{str(e)}")
            time.sleep(3)
            response = ses.send_email(**params)
            print(f"Email sent to {i} -> {i+30}")


send_emails(
    admins(), "Surprise! A Perfect Match with Mutual 💌", open("./collab.html").read()
)
