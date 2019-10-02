# boilerplate-project-urlshortener
A boilerplate for a freeCodeCamp project.
Adrian's Project: URL Shortener Microservice
User Story:
1. I can POST a URL to [project_url]/api/shorturl/new and I will receive a shortened URL in the JSON response.
Example : {"original_url":"www.google.com","short_url":1}

2. If I pass an invalid URL that doesn't follow the http(s)://www.example.com(/more/routes) format, the JSON response will contain an error like {"error":"invalid URL"}
3. When I visit shotened URL, it will redirect me to my original Link
Short URL Creation
example: POST [project_url]/api/shorturl/new - http(s)://www.example.com

URL to be shortened 
 POST URL
Example usage:
[this-project-title]/api/shortulr/3

Will redirect to:
www.freecode.camp
