import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { API_BASE_URL } from '../constants';

const StoreContext = createContext(undefined);

export const StoreProvider = ({ children }) => {
  const { token, isAuthenticated } = useAuth();
  const [state, setState] = useState({
    clients: [],
    projects: [],
    timeEntries: [],
    activeTimerId: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Helper for authorized fetch
  const authFetch = async (endpoint, options = {}) => {
    if (!token) throw new Error('No token provided');
    
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API Error: ${response.statusText}`);
    }

    return response.json();
  };

  const fetchData = async () => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    setError(null);
    try {
      const [clients, projects, entries] = await Promise.all([
        authFetch('/clients'),
        authFetch('/projects'),
        authFetch('/time-entries')
      ]);

      // Determine active timer
      const activeEntry = entries.find(e => !e.endTime);

      setState({
        clients,
        projects,
        timeEntries: entries,
        activeTimerId: activeEntry ? activeEntry.id : null
      });
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isAuthenticated, token]);

  const addClient = async (clientData) => {
    try {
      const newClient = await authFetch('/clients', {
        method: 'POST',
        body: JSON.stringify(clientData)
      });
      setState(prev => ({ ...prev, clients: [newClient, ...prev.clients] }));
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteClient = async (id) => {
    try {
      await authFetch(`/clients/${id}`, { method: 'DELETE' });
      setState(prev => ({
        ...prev,
        clients: prev.clients.filter(c => c.id !== id),
        projects: prev.projects.filter(p => p.clientId !== id)
      }));
    } catch (err) {
      setError(err.message);
    }
  };

  const addProject = async (projectData) => {
    try {
      const newProject = await authFetch('/projects', {
        method: 'POST',
        body: JSON.stringify(projectData)
      });
      setState(prev => ({ ...prev, projects: [newProject, ...prev.projects] }));
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteProject = async (id) => {
    try {
      await authFetch(`/projects/${id}`, { method: 'DELETE' });
      setState(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== id) }));
    } catch (err) {
      setError(err.message);
    }
  };

  const addTimeEntry = async (entryData) => {
    try {
      const newEntry = await authFetch('/time-entries', {
        method: 'POST',
        body: JSON.stringify(entryData)
      });
      
      setState(prev => {
        const isTimer = !newEntry.endTime;
        return {
          ...prev,
          timeEntries: [newEntry, ...prev.timeEntries],
          activeTimerId: isTimer ? newEntry.id : prev.activeTimerId
        };
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const updateTimeEntry = async (updated) => {
    try {
      const result = await authFetch(`/time-entries/${updated.id}`, {
        method: 'PUT',
        body: JSON.stringify(updated)
      });

      setState(prev => ({
        ...prev,
        timeEntries: prev.timeEntries.map(t => t.id === result.id ? result : t),
        activeTimerId: (result.id === prev.activeTimerId && result.endTime) ? null : prev.activeTimerId
      }));
    } catch (err) {
      setError(err.message);
    }
  };

  const stopActiveTimer = async () => {
    if (!state.activeTimerId) return;
    const entry = state.timeEntries.find(t => t.id === state.activeTimerId);
    if (entry) {
      await updateTimeEntry({ ...entry, endTime: new Date().toISOString() });
    }
  };

  const deleteTimeEntry = async (id) => {
    try {
      await authFetch(`/time-entries/${id}`, { method: 'DELETE' });
      setState(prev => ({
        ...prev,
        timeEntries: prev.timeEntries.filter(t => t.id !== id),
        activeTimerId: prev.activeTimerId === id ? null : prev.activeTimerId
      }));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <StoreContext.Provider value={{
      ...state,
      addClient,
      deleteClient,
      addProject,
      deleteProject,
      addTimeEntry,
      updateTimeEntry,
      deleteTimeEntry,
      stopActiveTimer,
      loading,
      error
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
};