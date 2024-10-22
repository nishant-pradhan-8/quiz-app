import axios from "axios";
import { useEffect, useState } from "react";


function useAxiosFetch(selection, difficulty, category, limit) {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const API = "https://quizapi.io/api/v1/questions";
  const apiKey = process.env.REACT_APP_API_KEY;
  console.log(apiKey)
  useEffect(() => {
    let isMounted = true;
    const fetchQuiz = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(API, {
          params: {
            apiKey: apiKey,
            limit: `${limit}`,
            category: `${category}`,
            difficulty: `${difficulty}`,
            tags: `${selection}`,
          },
        });
        const data = response.data;

        if (isMounted) {
          setQuestions(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuiz();

    return () => {
      isMounted = false;
    };
  }, [selection, category, difficulty, limit]);

  console.log(questions);
  return { questions, error, isLoading };
}

export default useAxiosFetch;
