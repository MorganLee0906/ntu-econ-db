import json
import csv
folder_id = {}
db = {}
f = open("./01.csv", "r")
rootid = "1iHqnZvvTuCUpzawRUGP9SOArqx0U76po"
folder_id["01經濟學原理與實習"] = rootid
db[rootid] = {"route": "01經濟學原理與實習", "folder": [], "file": []}
reader = csv.reader(f)
data = list(reader)
for i in data:
    route = i[0]
    url = i[2]
    if url.find("https://drive.google.com/drive/folders/") != -1:
        if route not in folder_id:
            folder_id[route] = url.split("/")[-1]
            db[url.split("/")[-1]] = {"route": "", "folder": [], "file": []}
        parent = "/".join(route.split("/")[0:-1])
        db[url.split("/")[-1]]["route"] = route
        if parent in folder_id:
            db[folder_id[parent]]["folder"].append(
                {"url": url.split("/")[-1], "name": route.split("/")[-1]})
        print("Now add folder: ", url.split("/")[-1], " to ", parent)
    elif url.find("https://drive.google.com/file/d/") != -1:
        parent = "/".join(route.split("/")[0:-1])
        db[folder_id[parent]]["file"].append(
            {"url": url.split("/")[-2], "name": route.split("/")[-1]})
        print("Now add file: ", url.split("/")[-2], " to ", parent)
f.close()
f = open("01.json", "w", encoding="utf-8")
json.dump(db, f, ensure_ascii=False)
f.close()
