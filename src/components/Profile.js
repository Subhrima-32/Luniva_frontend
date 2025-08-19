import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import Suggestions from "./Suggestions";
import io from "socket.io-client";
import "./Profile.css";

// Connect to backend socket
const socket = io("http://localhost:5000");

export default function Profile() {
  // Followers - 50 real Indian names
  const [followers, setFollowers] = useState([
    { id: 1, name: 'Aarav' }, { id: 2, name: 'Vivaan' }, { id: 3, name: 'Aditya' },
    { id: 4, name: 'Arjun' }, { id: 5, name: 'Reyansh' }, { id: 6, name: 'Sai' },
    { id: 7, name: 'Krishna' }, { id: 8, name: 'Ishaan' }, { id: 9, name: 'Raghav' },
    { id: 10, name: 'Shaurya' }, { id: 11, name: 'Ananya' }, { id: 12, name: 'Saanvi' },
    { id: 13, name: 'Diya' }, { id: 14, name: 'Aadhya' }, { id: 15, name: 'Ira' },
    { id: 16, name: 'Meera' }, { id: 17, name: 'Anika' }, { id: 18, name: 'Riya' },
    { id: 19, name: 'Navya' }, { id: 20, name: 'Kiara' }, { id: 21, name: 'Ved' },
    { id: 22, name: 'Aryan' }, { id: 23, name: 'Kabir' }, { id: 24, name: 'Vivaan' },
    { id: 25, name: 'Rohan' }, { id: 26, name: 'Ayaan' }, { id: 27, name: 'Dev' },
    { id: 28, name: 'Yash' }, { id: 29, name: 'Arya' }, { id: 30, name: 'Shreya' },
    { id: 31, name: 'Tara' }, { id: 32, name: 'Anvi' }, { id: 33, name: 'Maya' },
    { id: 34, name: 'Siddharth' }, { id: 35, name: 'Kartik' }, { id: 36, name: 'Ritika' },
    { id: 37, name: 'Prisha' }, { id: 38, name: 'Shivansh' }, { id: 39, name: 'Parth' },
    { id: 40, name: 'Arnav' }, { id: 41, name: 'Esha' }, { id: 42, name: 'Aarohi' },
    { id: 43, name: 'Ishita' }, { id: 44, name: 'Tanvi' }, { id: 45, name: 'Aditi' },
    { id: 46, name: 'Rudra' }, { id: 47, name: 'Lakshya' }, { id: 48, name: 'Devansh' },
    { id: 49, name: 'Ansh' }, { id: 50, name: 'Kavya' }
  ]);

  // Following - 26 real Indian names
  const [following, setFollowing] = useState([
    { id: 51, name: 'Rahul' }, { id: 52, name: 'Priya' }, { id: 53, name: 'Neha' },
    { id: 54, name: 'Rohit' }, { id: 55, name: 'Anjali' }, { id: 56, name: 'Soham' },
    { id: 57, name: 'Tanay' }, { id: 58, name: 'Kiran' }, { id: 59, name: 'Bhavya' },
    { id: 60, name: 'Shivani' }, { id: 61, name: 'Ritika' }, { id: 62, name: 'Aman' },
    { id: 63, name: 'Mehul' }, { id: 64, name: 'Nisha' }, { id: 65, name: 'Sanya' },
    { id: 66, name: 'Vikram' }, { id: 67, name: 'Rhea' }, { id: 68, name: 'Advik' },
    { id: 69, name: 'Anaya' }, { id: 70, name: 'Harsh' }, { id: 71, name: 'Aarush' },
    { id: 72, name: 'Lavanya' }, { id: 73, name: 'Pari' }, { id: 74, name: 'Kabir' },
    { id: 75, name: 'Ishaan' }, { id: 76, name: 'Tanvi' }
  ]);

  // Suggestions
  const [suggestions, setSuggestions] = useState([
    { id: 100, name: 'Michael', following: false },
    { id: 101, name: 'Sophia', following: false },
    { id: 102, name: 'Daniel', following: false }
  ]);

  const [openModal, setOpenModal] = useState(null);

  const emitStatsUpdate = (updatedFollowers = followers, updatedFollowing = following) => {
    socket.emit("updateStats", {
      followers: updatedFollowers.length,
      following: updatedFollowing.length,
      posts: 10,
      likes: 503
    });
  };

  const removeFollower = (id) => {
    const updated = followers.filter(p => p.id !== id);
    setFollowers(updated);
    emitStatsUpdate(updated, following);
  };

  const unfollow = (id) => {
    const updated = following.filter(p => p.id !== id);
    setFollowing(updated);
    emitStatsUpdate(followers, updated);
  };

  const followFromSuggestion = (id) => {
    setSuggestions(prev =>
      prev.map(s => s.id === id ? { ...s, following: true } : s)
    );
    const person = suggestions.find(s => s.id === id);
    if (person && !followers.some(f => f.id === id)) {
      const updated = [...followers, { id: person.id, name: person.name }];
      setFollowers(updated);
      emitStatsUpdate(updated, following);
    }
  };

  useEffect(() => {
    emitStatsUpdate(followers, following);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Profile</h2>

      <div style={{ display: 'flex', gap: 20, margin: '10px 0' }}>
        <button onClick={() => setOpenModal('followers')}>
          Followers ({followers.length})
        </button>
        <button onClick={() => setOpenModal('following')}>
          Following ({following.length})
        </button>
      </div>

      <h3>Suggestions</h3>
      <Suggestions
        suggestions={suggestions}
        onFollow={followFromSuggestion}
      />

      {/* ===== Footer Info Buttons ===== */}
      <div style={{ marginTop: 30, borderTop: "1px solid #ddd", paddingTop: 15 }}>
        <h4>More</h4>
        <button onClick={() => setOpenModal('about')}>About Luniva</button>
        <button onClick={() => setOpenModal('contact')}>Contact / Support</button>
        <button onClick={() => setOpenModal('terms')}>Terms & Privacy</button>
      </div>

      {/* ===== Modals ===== */}
      {openModal === 'followers' && (
        <Modal title="Followers" onClose={() => setOpenModal(null)}>
          {followers.length === 0 ? <p>No followers yet.</p> : (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {followers.map(person => (
                <li key={person.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #eee' }}>
                  <span>{person.name}</span>
                  <button onClick={() => removeFollower(person.id)}>Remove</button>
                </li>
              ))}
            </ul>
          )}
        </Modal>
      )}

      {openModal === 'following' && (
        <Modal title="Following" onClose={() => setOpenModal(null)}>
          {following.length === 0 ? <p>Not following anyone.</p> : (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {following.map(person => (
                <li key={person.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #eee' }}>
                  <span>{person.name}</span>
                  <button onClick={() => unfollow(person.id)}>Unfollow</button>
                </li>
              ))}
            </ul>
          )}
        </Modal>
      )}

      {/* About Luniva */}
      {openModal === 'about' && (
        <Modal title="About Luniva" onClose={() => setOpenModal(null)}>
          <p>Created by <strong>Subhrima Adhya</strong> (18th August 2025)</p>
        </Modal>
      )}

      {/* Contact */}
      {openModal === 'contact' && (
        <Modal title="Contact / Support" onClose={() => setOpenModal(null)}>
          <p>Email: <strong>Subhrimaadhya.23@nshm.edu.in</strong></p>
          <p>Support: <strong>Lunivasupport.edu.in</strong></p>
        </Modal>
      )}

      {/* Terms */}
      {openModal === 'terms' && (
        <Modal title="Terms & Privacy" onClose={() => setOpenModal(null)}>
          <div style={{ maxHeight: "300px", overflowY: "auto", paddingRight: "8px" }}>
            <p><strong>Effective Date:</strong> 18/08/2025</p>
            <p>Welcome to Luniva, a communication platform where people can connect, share thoughts, and build meaningful conversations without the pressure of being seen. By using Luniva, you agree to the following terms and conditions:</p>
            <p><strong>1. Purpose of Luniva</strong><br />Luniva is designed for safe, anonymous communication...</p>
            <p><strong>2. Eligibility</strong><br />You must be 13 years or older to use Luniva...</p>
            <p><strong>3. User Responsibilities</strong><br />Respect all users, no harassment, bullying...</p>
            <p><strong>4. Privacy & Anonymity</strong><br />We do not share personal data...</p>
            <p><strong>5. Content Guidelines</strong><br />No explicit, hateful, or extremist material...</p>
            <p><strong>6. Safety</strong><br />Report inappropriate behavior...</p>
            <p><strong>7. Intellectual Property</strong><br />You own your content, but grant Luniva license...</p>
            <p><strong>8. Limitations of Liability</strong><br />Luniva is not responsible for misuse...</p>
            <p><strong>9. Termination</strong><br />We may suspend accounts that violate terms...</p>
            <p><strong>10. Updates</strong><br />Terms may be updated and continued use means acceptance.</p>
          </div>
        </Modal>
      )}
    </div>
  );
}