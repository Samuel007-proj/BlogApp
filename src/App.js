import './App.css';
import BlogPage from "./BlogPage"
import { StoreProvider } from './store';

const App = () => {
 

  return (
    <div className="font-sans">
      <StoreProvider>
        <BlogPage />
      </StoreProvider>
      
    </div>
  )
}

export default App;
