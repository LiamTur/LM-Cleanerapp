import { useEffect, useState, useRef } from 'react'
import './Chores.css'
function Chores() {

  const user = localStorage.getItem('loggedInUser');

  const defaultState = {
    kitchen: false,
    bathroom: false,
    laundry: false,
  };

  const [checked, setChecked] = useState(() => {
  const stored = localStorage.getItem('chores');
    return stored ? JSON.parse(stored) : defaultState;
  });

  useEffect(() => {
    localStorage.setItem('chores', JSON.stringify(checked));
  }, [checked]);

  const handleToggle = (chore) => {
    setChecked(prev => ({
      ...prev,
      [chore]: !prev[chore],
    }));
  };

	// handle shopping below

  const [groceries, setGroceries] = useState(() => {
    const stored = localStorage.getItem('groceries');
    if (stored) {
        return JSON.parse(stored).map((label, idx) => ({
        id: idx,
	label,
        checked: false,
      }));
    }
    return [];
  });

  const timers = useRef({});

  useEffect(() => {
    localStorage.setItem('groceries', JSON.stringify(groceries.map(g => g.label)));
  }, [groceries]);

  const handleCheckGrocery = (id) => {
    setGroceries(prev =>
      prev.map(item => {
        if (item.id !== id) return item;

        const newChecked = !item.checked;

        if (newChecked) {
          const timeoutID = setTimeout(() => {
            setGroceries(current => {
		  const updated = current.filter(x => x.id !== id);
		  localStorage.setItem('groceries', JSON.stringify(updated.map(g => g.label)));
		  return updated;
		});
            delete timers.current[id];
          }, 5000);

          timers.current[id] = timeoutID;
        } else {
          if (timers.current[id]) {
            clearTimeout(timers.current[id]);
            delete timers.current[id];
          }
        }

        return { ...item, checked: newChecked };
      })
    );
  };


  return (
  <>
    <div>
      <h1>Welcome, {user}!</h1>
      <p>Here are the chores</p>
    </div>
    <div>
      <h2>Today's Chores</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {[
          { key: 'kitchen', label: 'Clean kitchen' },
          { key: 'bathroom', label: 'Clean bathroom' },
          { key: 'laundry', label: 'Do laundry' },
        ].map(chore => (
          <li key={chore.key} style={{ display: 'grid', 
		gridTemplateColumns: 'auto 1fr', 
		alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <label style={{ fontSize: '1.2rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={checked[chore.key]}
                onChange={() => handleToggle(chore.key)}
                style={{ marginRight: '0.5rem' }}
              />
              <span
                style={{
                  textDecoration: checked[chore.key] ? 'line-through' : 'none',
                  color: checked[chore.key] ? '#888' : '#000',
                }}
              >
                {chore.label}
              </span>
            </label>
          </li>
        ))}
      </ul>

	{groceries.length > 0 && (
  <>
    <h2>Groceries</h2>
    <ul>
      {groceries.map((item, index) => (
        <li key={index}>
          <label>
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => handleCheckGrocery(index)}
            />
            {item.label}
          </label>
        </li>
      ))}
    </ul>
  </>
)}

    </div>
</>
  );
}

export default Chores;

