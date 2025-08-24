import { useState, useCallback } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export const useApi = (resource) => {
  const base = `${API_URL}/${resource}`;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  // GET all
  const getAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(base);
      const json = await res.json();
      setData(json);
      return json;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [base]);

  // POST
  const create = useCallback(async (body) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(base, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
     
      return json;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [base]);

  // PUT
  const update = useCallback(async (id, body) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${base}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      return json;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [base]);

    // DELETE
  const remove = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${base}/${id}`, {
        method: "DELETE"
      });
      const json = await res.json();
      return json;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [base]);

  return { data, loading, error, getAll, create, update, remove };
};
