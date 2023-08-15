import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import bg from './assets/img/forecast-wallpaper.jpg'
import CollectData from './components/CollectData';

const App = () => {
  return (
    <div className='App' style={{ backgroundImage: `url(${bg})` }}>
      <CollectData />
    </div>
  )
}

export default App
