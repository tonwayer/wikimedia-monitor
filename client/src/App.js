import React, { useEffect, useState, useRef} from 'react';
import './App.css';
import FilterControls from './FilterControls';
import EditList from './EditList';

const ENDPOINT = window.location.origin.replace(/^http/, 'ws');

function App() {
  const connection = useRef(null)

  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({
    domain: '',
    namespace: '',
    minor: false,
    bot: false,
    regex: '',
    anonymous: false
  });

  useEffect(() => {
    const socket = new WebSocket(ENDPOINT);
    socket.addEventListener("message", (message) => {
      const event = JSON.parse(message.data);
      setEvents((prevEvents) => [...prevEvents, event]);
    })
    connection.current = socket
    return () => connection.current.close();
  }, []);

  const markAsSeen = (index) => {
    setEvents(events.filter((_, i) => i !== index));
  };

  const applyFilters = (event) => {
    const { domain, namespace, minor, bot, regex, anonymous } = filters;
    if (domain && !event.server_name.includes(domain)) return false;
    if (namespace && event.namespace !== namespace) return false;
    if (minor && !event.minor) return false;
    if (bot && !event.bot) return false;
    if (regex && !new RegExp(regex).test(event.title)) return false;
    if (anonymous && !event.anonymous) return false;
    return true;
  };

  return (
    <div className="App">
      <h1>Wikimedia Event Stream</h1>
      <FilterControls filters={filters} setFilters={setFilters} />
      <EditList events={events.filter(applyFilters)} markAsSeen={markAsSeen} />
    </div>
  );
}

export default App;
