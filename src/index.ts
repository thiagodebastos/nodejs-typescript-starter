import http, { RequestListener } from 'http'

const HOST = 'localhost'
const PORT = 8000

interface Recipe {
  title: string,
  ingredients: string[],
}

const recipes: Recipe[] = [
  {
    title: "Plant Based Pho",
    ingredients: [
      "carrots",
      "cocounut"
    ]
  },
  {
    title: "Garden Salad",
    ingredients: [
      "lettuce",
      "tomato",
      "cashew nuts"
    ]
  }
]

const recipesListener: RequestListener = function(req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.writeHead(200)
  res.end(JSON.stringify(recipes))
}

const notFoundListener: RequestListener = function(req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.writeHead(404)
  res.end(JSON.stringify({ error: "Resource not found" }))
}

const requestListener: RequestListener = function(req, res) {
  switch (req.url) {
    case "/recipes":
      recipesListener(req, res)
      break;

    default:
      notFoundListener(req, res)
  }
}

const server = http.createServer(requestListener)

server.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`)
})
