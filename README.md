# Email service

Project to handler email

### Environment variable

Create a .env file and add the following value:
`aws region name`
REGION=region
`aws access key`
ACCESS_KEY=access_key
`aws secret access key`
SECRET_ACCESS_KEY=secret_access_key
`aws sqs queue url. You can copy from aws console`
QUEUE_URL=queue_url
`aws arm sqs. ex:arn:aws:sqs:region_name:number:sqs_name`
ARM_SQS=arm_sqs
`source email address`
SOURCE_MAIL=source_email_address

### Run locally

`npm install`
`npm run offline`

### Deploy

When all the variables are set so you should run the following command:

`npm run deploy`

### Create AWS SES template json file

In order to create a new template email, there is not necessary to save on the json template in the repo
but the idea is to keep it because it is easy to access and have a backup.

1- Create a new json template on template folder(@services/mail/template). The name should be in lowercase
and have a hyphen between letter change. For example: new-email.json

```
{
  "Template": {
    "TemplateName": "new-email",
    "SubjectPart": "Subject title",
    "HtmlPart": "<p>Hi {{ name }},</p>"
  }
}
```

2- Upload the template in AWS SES using the following command

`aws ses create-template --cli-input-json file://new-email.json`

### Functions available

```
    url: /v1/notifications
    method: POST
    body: {
        "destinationEmail": "destination_email_address",
        "templateName": "template_name",
        "templateData": { }
    }
    Response: {
        "message": {
            "ResponseMetadata": {
                "RequestId": "string"
            },
            "MD5OfMessageBody": "string",
            "MessageId": "string"
        }
    }
```

```
    url: /v1/notifications/bulk
    method: POST
    body: {
        messages: [{
            "destinationEmail": "destination_email_address",
            "templateName": "template_name",
            "templateData": { }
        }]
    }
    Response: {
        "message": {
            "listOfMessageNotProcessing": {"destinationEmail":"destination_email_address","templateName":"template_name","templateData":{}}[]
        }
    }
```

```
    url: /v1/templates
    method: GET
    Param: {
        "name": "template_name",
    }
    Response: {
        "message": {
            "ResponseMetadata": {
                "RequestId": "string"
            },
            "Template": {
                "TemplateName": "new_lead",
                "SubjectPart": "You have a new lead",
                "HtmlPart": "<p>Hi {{ name }}</p>"
            }
        }
    }
```
