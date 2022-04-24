import Header from '../../components/Header';
import Filter from '../../components/Filter';
import Card from '../../components/Card';
import Resume from '../../components/Resume';
import './styles.css';

function Main() {
    return (
        <main>
            <Header />
            <div className='container flex'>
                <div>
                    <Filter />
                    <Card />
                </div>
                <Resume />
            </div>
        </main>
    )
}

export default Main;