// pages/index.js
import Head from 'next/head';
import Layout from '../../../components/layout';
import { useRouter } from 'next/router';
import { getAllFolders, getFoldersData } from '../../../lib/folder';

export default function Folder({ folderData }) {
    const childFolders = folderData["folder"].sort((a, b) => a.name.localeCompare(b.name));
    const files = folderData["file"].sort((a, b) => a.name.localeCompare(b.name));
    console.log("Generating folder page:" + folderData["route"]);
    const router = useRouter();
    const { cid, fid } = router.query;
    return (
        <div>
            <Layout>
                <div class="container">
                    <center>
                        <h2>課程資料</h2>
                    </center>
                </div>
                <div class="container">
                    <h6>現在位置：
                        {folderData["route"].split('/').map((c) => (
                            <span class="badge bg-primary me-2 align-items-center">{c}</span>

                        ))}
                    </h6>
                </div>
                <div class="container">
                    <ul class="list-group list-group-flush">
                        <div className="list-group">
                            {childFolders.map((folder) => {
                                const hasFiles = folder["file_count"] > 0;
                                const linkProps = hasFiles
                                    ? { href: `/folder/${cid}/${folder["url"]}`, className: "list-group-item list-group-item-action" }
                                    : {
                                        className: "list-group-item list-group-item-action disabled text-muted",
                                        title: "此資料夾無檔案"
                                    };
                                return (
                                    <a key={folder["url"]} {...linkProps}>
                                        <div class="d-flex w-100 justify-content-begin">
                                            <h5 class="mb-1">{folder["name"]}</h5>
                                        </div>
                                        <div class="d-flex justify-content-end">
                                            {hasFiles ? (
                                                <span class="badge bg-primary me-2 align-items-center">
                                                    共有{folder["file_count"]}個檔案
                                                </span>
                                            ) : (
                                                <span class="badge bg-secondary me-2 align-items-center">
                                                    本資料夾暫無檔案
                                                </span>
                                            )}
                                        </div>
                                    </a>
                                );
                            })}
                        </div>
                    </ul>
                    <div className="list-group">
                        {files.map((file) => (
                            <a href={`/file?id=${file["url"]}`} className="list-group-item list-group-item-action">{file["name"]}</a>
                        ))}
                    </div>
                    {childFolders.length === 0 && files.length === 0 && (
                        <p>抱歉，這裡沒有任何文件和資料夾:(</p>
                    )}
                </div>
            </Layout>
        </div>
    );
}



export async function getStaticPaths() {
    const paths = getAllFolders();
    //console.log(paths);
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {

    const curriId = params.cid;
    const folderId = params.fid;
    const folderData = getFoldersData(curriId, folderId);
    return {
        props: {
            folderData,
        },
    };
}
