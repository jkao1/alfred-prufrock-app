# Alfred Prufrock Editor  
Also known as Think Freely. 🌳 A web application, built on Node.js and Express, with Jade, D3, and GCP's NLP API to augment free-writing. Constructs, real-time, a tree that holds dependent nouns as nodes and recursively creates edges using morphology and syntax analysis. Edit
Add topics

## Setup
Ask Jason Kao for a service account key. Put the JSON file into `./public` and add the filename to your .env:
```
GOOGLE_APPLICATION_CREDENTIALS='./public/freewriting-ALPHANUMERICS.json'
```
Run `node server.js`

### Configuration
- **Platform:** node
- **Framework**: express
- **Template Engine**: jade

### Demo
<img src="demo.gif"/>
