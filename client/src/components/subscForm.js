import { useState } from 'react';
import { useParams } from 'react-router-dom';

function SubscriptionForm() {
  const { id } = useParams();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/subsc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            categoryja: id,
            email: email,
        }),
      });
      const data = await response.json();
      console.log(data);
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {isSubmitted ? (
        <p style={{ textAlign: 'center', fontWeight: 'bold' }}>Your has been subscribed.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem", marginTop:100 }}>
            <label htmlFor="email" style={{ display: "block", fontWeight: "bold", marginBottom: "0.5rem" }}>Тут вы можете подписаться на эту категорию новостей, просто  введите свой емейл тут:</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{  padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc", width: "100%" }}
              required
            />
          </div>
          <button type="submit" style={{ width:"100%", backgroundColor: "#0077FF", color: "white", padding: "0.5rem 1rem", borderRadius: "4px", border: "none", cursor: "pointer" }}>Submit</button>
        </form>
      )}
    </div>
  );
}

export default SubscriptionForm;