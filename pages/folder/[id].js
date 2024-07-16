// pages/index.js
import Head from 'next/head';
import Layout from '../../components/layout';
import { useRouter } from 'next/router';
import { getFoldersData } from '../../lib/folder';

export default function Folder({ folders }) {
    const childFolders = folders["folder"];
    const files = folders["file"];
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
                        {folders["route"].split('/').map((c) => (
                            <span class="badge bg-primary me-2 align-items-center">{c}</span>
                        ))}
                    </h6>
                </div>
                <div class="container">
                    <ul class="list-group list-group-flush">
                        <div className="list-group">

                            {childFolders.map((folder) => (
                                <a href={`/folder/01?fid=${folder["url"]}`} className="list-group-item list-group-item-action">{folder["name"]}</a>
                            ))}
                        </div>
                    </ul>
                    <div className="list-group">
                        {files.map((file) => (
                            <a href={`/file/${file["url"]}`} className="list-group-item list-group-item-action">{file["name"]}</a>
                        ))}
                    </div>
                </div>
            </Layout>
        </div>
    );
}

export async function getServerSideProps(context) {
    const { id, fid: folderid } = context.query;
    console.log(folderid);
    const folders = await getFoldersData(id, folderid);
    return {
        props: {
            folders
        }
    };
}