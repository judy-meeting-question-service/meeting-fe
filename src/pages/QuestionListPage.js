import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuestionForm from '../components/QuestionForm';

function QuestionListPage() {
  const [questions, setQuestions] = useState([]);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [availableTags, setAvailableTags] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = () => {
    axios.get('http://localhost:9000/api/questions')
      .then(response => {
        setQuestions(response.data);
        const tags = Array.from(new Set(response.data.flatMap(q => q.tags)));
        setAvailableTags(tags);
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
      });
  };

  const handleAddQuestion = (question) => {
    axios.post('http://localhost:9000/api/questions', question)
      .then(() => {
        fetchQuestions();
      })
      .catch(error => {
        console.error('Error adding question:', error);
      });
  };

  const handleDeleteQuestion = (id) => {
    axios.delete(`http://localhost:9000/api/questions/${id}`)
      .then(() => {
        fetchQuestions();
      })
      .catch(error => {
        console.error('Error deleting question:', error);
      });
  };

  const handleEditQuestion = (id, updatedQuestion) => {
    axios.put(`http://localhost:9000/api/questions/${id}`, updatedQuestion)
      .then(() => {
        fetchQuestions();
        setEditingQuestion(null);
      })
      .catch(error => {
        console.error('Error updating question:', error);
      });
  };

  const filteredQuestions = questions.filter(q =>
    q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div>
      <h1 style={{ textAlign: "left", fontSize: "18px", fontWeight: "bold" }}>질문 만들기</h1>
      <QuestionForm onSubmit={handleAddQuestion} availableTags={availableTags} />
      
      <div className="space" style={{ height: "30px" }} />
      <hr />
      <div className="space" style={{ height: "30px" }} />
      <div className="questionlist-header">
        <h1 style={{ textAlign: "left", fontSize: "18px", fontWeight: "bold", width: "200px" }}>질문 리스트</h1>
        <div className="search-question">
          <input
            type="text"
            placeholder="Search questions"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <ul className='question-box'>
        {filteredQuestions.map(q => (
          <li className='question-card' key={q.id}>
            <div className='question-card-content'>
              <h2 className="title">{q.question}</h2>
              <p className="description">{q.description}</p>
              <div className="card-floor">
                <div className="tags">
                  {q.tags.map((tag, index) => (
                    <div key={index} className="tag-box">
                      #{tag}
                    </div>
                  ))}
                </div>
                <div className="card-buttons">
                  <button onClick={() => setEditingQuestion(q)}>Edit</button>
                  <button onClick={() => handleDeleteQuestion(q.id)}>Delete</button>
                </div>
              </div>
            </div>
            {editingQuestion && editingQuestion.id === q.id && (
              <QuestionForm
                initialData={editingQuestion}
                onSubmit={(updatedQuestion) => handleEditQuestion(q.id, updatedQuestion)}
                availableTags={availableTags}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuestionListPage;
