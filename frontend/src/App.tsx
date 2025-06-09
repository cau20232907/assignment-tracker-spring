import { useState } from 'react';
import AssignmentList from './components/AssignmentList';
import NewAssignmentForm from './components/NewAssignmentForm';
import './App.css';

function App() {
  const [refreshList, setRefreshList] = useState(false);

  const handleAssignmentCreated = () => {
    setRefreshList(true);
  };

  const handleRefreshComplete = () => {
    setRefreshList(false);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Assignment Tracker</h1>
        <p>과제를 효율적으로 관리해보세요</p>
      </header>
      
      <main className="app-main">
        <div className="container">
          <div className="form-section">
            <NewAssignmentForm onSuccess={handleAssignmentCreated} />
          </div>
          
          <div className="list-section">
            <AssignmentList 
              refresh={refreshList}
              onRefreshComplete={handleRefreshComplete}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
