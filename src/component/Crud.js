import { useState, useEffect } from "react";

export default function Crud() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState(0);

  const [users, setUsers] = useState([]);

  const [edit, setEdit] = useState(false);

  async function getUsers() {
    const response = await fetch("http://localhost:5000/users");
    const data = await response.json();
    setUsers(data);
  }

  useEffect(() => {
    getUsers();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!edit) {
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          password,
        }),
      });
      await response.json();
    } else {
      const response = await fetch(`http://localhost:5000/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          password,
        }),
      });
      await response.json();
      setEdit(false);
      setId(0);
    }
    await getUsers();
    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
  }

  async function deleteUser(id) {
    const response = await fetch(`http://localhost:5000/users/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log(data);
    await getUsers();
  }

  async function getUser(id) {
    const data = await fetch(`http://localhost:5000/users/${id}`);
    const user = await data.json();
    setFirstname(user.firstname);
    setLastname(user.lastname);
    setEmail(user.email);
    setPassword(user.password);
    setId(user.id);
    setEdit(true);
  }

  return (
    <div className="container">
      <h2>Formulaire d'inscription :</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Prénom
          <input
            type="text"
            onChange={(e) => setFirstname(e.target.value)}
            value={firstname}
          />
        </label>
        <label>
          Nom
          <input
            type="text"
            onChange={(e) => setLastname(e.target.value)}
            value={lastname}
          />
        </label>
        <label>
          Email
          <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
        </label>
        <label>
          Mot de passe
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        <button className="submit">{edit ? "Modifier" : "Ajouter"}</button>
      </form>
      <div className="list">
        <h2>Liste des utilisateurs :</h2>
        <table>
          <thead>
            <tr>
              <th>Prénom</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Mot de passe</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>
                  <button onClick={() => deleteUser(user.id)}>Supprimer</button>
                  <button onClick={() => getUser(user.id)}>Modifier</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
