// pages/index.js
import Head from 'next/head';
import Layout from '../../../components/layout';
import { useRouter } from 'next/router';
import { getAllFolders, getFoldersData } from '../../../lib/folder';

export default function Folder({ folderData }) {
    const childFolders = folderData["folder"].sort((a, b) => a.name.localeCompare(b.name));
    const files = folderData["file"].sort((a, b) => a.name.localeCompare(b.name));
    console.log(files);
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
                            {childFolders.map((folder) => (
                                <a href={`/folder/${cid}/${folder["url"]}`} className="list-group-item list-group-item-action">{folder["name"]}</a>
                            ))}
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
