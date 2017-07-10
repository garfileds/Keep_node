### api

1. /plan `[GET]`

- response
```json
{
    "id": "p001",
    "title": "背单词：A-Z",
    "bg_image": "",
    "color": "#A7ED84",
    "progress_color": "#ffffff",
    "progress": {
      "start_day": "05/17/2017",
      "days": 14,
      "marked": [1, 3, 5, 7, 9, 14],
      "done": [1]
    },
    "status": "ing",
    
    "badge": {
      "id": "b001",
      "image_url": ""
    }
}
```

2. /plan `[POST]`

- request
```json
{
  "title":"概率论",
  "start_day":"7/7/2017",
  "color":"#76FF7B",
  "progress_color":"#fff",
  "days":"21",
  "marked":[1,11,21]
}
```

2. /plans `[GET]`

- response
```json
{
  "commit_id": "",
  "plans": []
}
```