import json
import csv
import os
import datetime

total_files = 0
fcnt = 0
dcnt = 0


def finalizeCounts(db, folderId):
    total_files = db[folderId]["file_count"]
    for child in db[folderId]["folder"]:
        childId = child["url"]
        child["file_count"] = db[childId]["file_count"]
    return total_files


def processCSV(folderName, folderId):
    global fcnt, dcnt
    folder_id = {}
    db = {}
    f = open(f"./{folderName} {folderId}.csv", "r")
    folder_id[folderName] = folderId
    db[folderId] = {"route": folderName, "folder": [],
                    "file": [], "dir_count": 0, "file_count": 0}
    reader = csv.reader(f)
    data = list(reader)
    for i in data:
        route = i[0]
        url = i[2]
        if url.find("https://drive.google.com/drive/folders/") != -1:  # folder
            if route not in folder_id:  # new folder
                folder_id[route] = url.split("/")[-1]
                db[url.split("/")[-1]] = {"route": "",
                                          "folder": [],
                                          "file": [],
                                          "dir_count": 0,
                                          "file_count": 0}
            parent = "/".join(route.split("/")[0:-1])
            db[url.split("/")[-1]]["route"] = route
            if parent in folder_id:
                db[folder_id[parent]]["folder"].append({
                    "url": url.split("/")[-1],
                    "name": route.split("/")[-1]})
                db[folder_id[parent]]["dir_count"] += 1
                dcnt += 1
                # print("Now add folder: ", url.split("/")[-1], " to ", parent)

        elif url.find("https://drive.google.com/file/d/") != -1:  # file
            parent = "/".join(route.split("/")[0:-1])
            db[folder_id[parent]]["file"].append({
                "url": url.split("/")[-2],
                "name": route.split("/")[-1]})
            for i in range(len(route.split("/"))-1):
                db[folder_id["/".join(route.split("/")[0:i+1])]
                   ]["file_count"] += 1
            fcnt += 1
            # print("Now add file: ", url.split("/")[-2], " to ", parent)
    f.close()
    for fid in db:
        finalizeCounts(db, fid)
    f = open(f"../folders/{folderName[:2]}.json", "w", encoding="utf-8")
    json.dump(db, f, ensure_ascii=False, indent=4)
    f.close()


def genFolder(folderName, folderId):
    global fcnt
    # if os.path.exists(f"../curriculums/{folderName[:2]}-test.md"):
    #    print(f"../curriculums/{folderName[:2]}.md already exists")
    #    return
    m = open(f"../curriculums/{folderName[:2]}.md", "w")
    m.write("---\n")
    m.write(f"title: {folderName[2:]}\n")
    m.write(f"fcnt: {fcnt}\n")
    m.write(f"url: {folderName[:2]}\n")
    m.write(f"fid: {folderId}\n")
    m.write("---\n")
    m.write(f"更新日期：{datetime.date.today()}\n")
    m.close()


items = os.listdir('.')
for item in items:
    if item[-4:] != '.csv':
        continue
    fcnt = 0
    dcnt = 0
    folderName, folderId = item.split(' ')
    folderId = folderId[:-4]
    processCSV(folderName, folderId)
    genFolder(folderName, folderId)
    total_files += fcnt
    print(f"{folderName} {folderId} is done, {fcnt} files and {dcnt} folders")

print(f"Database has {total_files} files")
