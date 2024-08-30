import json
import csv
import os
import datetime

file_count = 0
dir_count = 0


def processCSV(folderName, folderId):
    global file_count
    global dir_count
    folder_id = {}
    db = {}
    f = open(f"./{folderName} {folderId}.csv", "r")
    folder_id[folderName] = folderId
    db[folderId] = {"route": folderName, "folder": [], "file": []}
    reader = csv.reader(f)
    data = list(reader)
    for i in data:
        route = i[0]
        url = i[2]
        if url.find("https://drive.google.com/drive/folders/") != -1:
            if route not in folder_id:
                folder_id[route] = url.split("/")[-1]
                db[url.split("/")[-1]] = {"route": "",
                                          "folder": [], "file": []}
            parent = "/".join(route.split("/")[0:-1])
            db[url.split("/")[-1]]["route"] = route
            if parent in folder_id:
                db[folder_id[parent]]["folder"].append(
                    {"url": url.split("/")[-1], "name": route.split("/")[-1]})
            print("Now add folder: ", url.split("/")[-1], " to ", parent)
            dir_count += 1
        elif url.find("https://drive.google.com/file/d/") != -1:
            parent = "/".join(route.split("/")[0:-1])
            db[folder_id[parent]]["file"].append(
                {"url": url.split("/")[-2], "name": route.split("/")[-1]})
            print("Now add file: ", url.split("/")[-2], " to ", parent)
            file_count += 1
    f.close()
    # f = open(f"../folders/{folderName[:2]}.json", "w", encoding="utf-8")
    # json.dump(db, f, ensure_ascii=False)
    # f.close()


def genFolder(folderName, folderId):
    if os.path.exists(f"../curriculums/{folderName[:2]}.md"):
        print(f"../curriculums/{folderName[:2]}.md already exists")
        return
    m = open(f"../curriculums/{folderName[:2]}.md", "w")
    m.write("---\n")
    m.write(f"title: {folderName[2:]}\n")
    m.write("cnum: \n")
    m.write(f"url: {folderName[:2]}\n")
    m.write(f"fid: {folderId}\n")
    m.write("---\n")
    m.write(f"更新日期：{datetime.date.today()}\n")
    m.close()


items = os.listdir('.')
for item in items:
    if item[-4:] != '.csv':
        continue
    folderName, folderId = item.split(' ')
    folderId = folderId[:-4]
    processCSV(folderName, folderId)
    # genFolder(folderName, folderId)
    
print(f"Database has {dir_count} folders and {file_count} files")
