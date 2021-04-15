
import React, {useState, useEffect} from 'react';
import db from './services/firebase';

function App() {

  const [burgers, setBurgers] = useState([]);
  const [burger, setBurger] = useState('');


  useEffect(() => {
    db.collection('burgers')
      .get()
      .then(res => {
        const data = res.docs.map((doc) => {
          return { id: doc.id, ...doc.data() }
        });
        setBurgers(data);
      })
      .catch(err => {
      console.log(err, 'err');
      })
  }, []);

  const addBurger = () => {
     db.collection("burgers")
          .add({name: burger, status: false})
          .then(res => {
            setBurgers([...burgers, {status: false, name: burger, id: res.id}]);
            setBurger('')
          })
          .catch(err => {
            console.log(err, 'err');
          });
  }

  const updateStatus = (id, eaten) => {
    db.collection("burgers")
          .doc(id)
          .update({status: eaten})
          .then(res => {
            let list = burgers;
            let index = list.findIndex(it => it.id === id);
            list[index] = {...list[index], status: eaten};
            setBurgers([...list]);
          })
          .catch(err => {
            console.log(err, 'err');
          });
  };

  const deleteBurger = (id) => {
    db.collection("burgers")
          .doc(id)
          .delete()
          .then(res => {
            let list = burgers;
            let index = list.findIndex(it => it.id === id);
            list.splice(index, 1);
            setBurgers([...list]);
          })
          .catch(err => {
            console.log(err, 'err');
          });
  };

  return (
    <div className='container'>
      <div className='row'>
          <h1>Burger made</h1>
          {burgers
            .filter(item => item.status === false)
            .map((item, index) => {
            return(
              <div className="item" key={index}>
                <div className="item_row">
                  <span>{item.name}</span>
                  <div className="control">
                    <div onClick={() => {updateStatus(item.id, true)}} className="eat">Eat it</div>
                    <div onClick={() => {deleteBurger(item.id)}} className="delete"/>
                  </div>
                </div>
              </div>
            )
          })}
          <div className="item">
                <div className="item_row">
                  <input value={burger} onChange={e => setBurger(e.target.value)} placeholder="Add burger"/>
                  <div className="control">
                    <div onClick={() => {
                        burger.length > 0 && addBurger();
                      }} className="add"/>
                  </div>
                </div>
          </div>
          <h1>Burger made</h1>
          {burgers
            .filter(item => item.status === true)
            .map((item, index) => {
            return(
              <div className="item" key={index}>
                <div className="item_row">
                  <span>{item.name}</span>
                  <div className="control">
                    <div onClick={() => {deleteBurger(item.id)}} className="delete"/>
                  </div>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  );
}

export default App;
