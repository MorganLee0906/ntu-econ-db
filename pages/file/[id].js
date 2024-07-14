import Head from 'next/head';
import Layout from '../../components/layout';
import { useRouter } from 'next/router';

export default function File() {
    const router = useRouter();
    const { id } = router.query;
    return (
        <div>
            <Head>
                <title>
                    檔案
                </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <div className="container" style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100px'
                }}>
                    <h2>檔案</h2>
                </div>
                <div class="container">
                    <center>
                        <iframe src={`https://drive.google.com/file/d/${id}/preview`} width="640" height="480" allow="autoplay"></iframe>
                    </center>
                </div>

            </Layout >
        </div >
    );
}
