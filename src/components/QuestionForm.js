import React, { useState, useEffect } from 'react';

function QuestionForm({ initialData, onSubmit, availableTags }) {
  const [question, setQuestion] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  useEffect(() => {
    if (initialData) {
      setQuestion(initialData.question);
      setDescription(initialData.description);
      setTags(initialData.tags.join(', '));
    }
  }, [initialData]);

  const handleTagAdd = (tag) => {
    const existingTags = tags.split(',').map(t => t.trim());
    if (tag && !existingTags.includes(tag)) {
      setTags(prevTags => prevTags ? `${prevTags}, ${tag}` : tag);
    }
  };

  const handleTagSelect = (e) => {
    const tag = e.target.value;
    handleTagAdd(tag);
    setSelectedTag(''); // Reset the select element to the initial state
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const questionData = {
      question,
      description,
      tags: tags.split(',').map(tag => tag.trim())
    };
    onSubmit(questionData);
    setQuestion('');
    setDescription('');
    setTags('');
    setSelectedTag('');
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="space" style={{ height: "10px" }} />
      <input
        type="text"
        placeholder="제목"
        value={question}
        onChange={e => setQuestion(e.target.value)}
        required
      />
      <textarea
        type="text"
        placeholder="정답"
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
      />
      <div className="tag-input-container">
        <input
          type="text"
          placeholder="태그, 쉼표로 구분 ( example : javascript, event )"
          value={tags}
          onChange={e => setTags(e.target.value)}
          required
        />
        <div className="space" style={{ height: "5px" }} />
        <div className="search-question make">
          <select value={selectedTag} onChange={handleTagSelect}>
            <option value="">태그 추가하기</option>
            {availableTags.map((tag, index) => (
              <option key={index} value={tag}>#{tag}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="submit-button">
        <button type="submit">{initialData ? 'Update' : 'Add'} Question</button>
      </div>
    </form>
  );
}

export default QuestionForm;
