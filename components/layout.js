import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './navbar';

export default function Layout({ children }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <div style={{ flex: '1' }}>
                {children}
            </div>
            <footer className="footer mt-auto py-3 bg-light">
                <div className="container" style={{ fontSize: '0.9rem' }}>
                    <h5 style={{ fontSize: '1rem' }}>台大經濟資料庫</h5>
                    <p className="text-muted">
                        本網站由台大經濟系學會學術部架設及維護，所有資料的著作權為各課程授課老師及檔案提供者所有，請勿將資料用於學習以外的用途。
                    </p>
                </div>
                <div className="container d-flex justify-content-between" style={{ fontSize: '0.9rem' }}>
                    <div>
                        <span className="text-muted">© 2024 台大經濟系學會學術部</span>
                        <br />
                        <span className="text-muted">Ver: 3.2</span>
                    </div>
                    <div>
                        <span className="text-muted">
                            網頁設計：
                            <a href="https://github.com/MorganLee0906">B12李承祐</a>
                        </span>
                    </div>
                </div>
            </footer>
        </div>
    );
}