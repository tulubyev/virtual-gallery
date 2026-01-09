// src/pages/AdminPanel.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { User } from '../types';

const PanelContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const PanelHeader = styled.h2`
  color: #333;
  margin-bottom: 1.5rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  text-align: center;
`;

const StatNumber = styled.p`
  font-size: 2rem;
  font-weight: bold;
  color: #6200ee;
  margin: 0.5rem 0;
`;

const TableContainer = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #eee;
  }

  th {
    background-color: #f8f9fa;
    font-weight: 600;
  }
`;

const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    opacity: 0.9;
  }
`;

const AdminPanel: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/users', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке пользователей:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const updateUserRole = async (userId: number, newRole: string) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/users/${userId}/role`,
        { role: newRole },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      // Обновляем состояние
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.user_id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (error) {
      console.error('Ошибка при обновлении роли пользователя:', error);
    }
  };

  const deleteUser = async (userId: number) => {
    if (window.confirm('Вы уверены, что хотите удалить этого пользователя?')) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/users/${userId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        
        // Обновляем состояние
        setUsers(prevUsers => prevUsers.filter(user => user.user_id !== userId));
      } catch (error) {
        console.error('Ошибка при удалении пользователя:', error);
      }
    }
  };

  return (
    <PanelContainer>
      <PanelHeader>Административная панель</PanelHeader>
      
      <StatsGrid>
        <StatCard>
          <h3>Всего пользователей</h3>
          <StatNumber>{users.length}</StatNumber>
        </StatCard>
        <StatCard>
          <h3>Администраторы</h3>
          <StatNumber>{users.filter(u => u.role === 'admin').length}</StatNumber>
        </StatCard>
        <StatCard>
          <h3>Кураторы</h3>
          <StatNumber>{users.filter(u => u.role === 'curator').length}</StatNumber>
        </StatCard>
        <StatCard>
          <h3>Сотрудники</h3>
          <StatNumber>{users.filter(u => u.role === 'staff').length}</StatNumber>
        </StatCard>
      </StatsGrid>

      <PanelHeader>Управление пользователями</PanelHeader>
      {loading ? (
        <p>Загрузка пользователей...</p>
      ) : (
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Имя пользователя</th>
                <th>Email</th>
                <th>Роль</th>
                <th>Дата регистрации</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.user_id}>
                  <td>{user.user_id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <select
                      value={user.role}
                      onChange={(e) => updateUserRole(user.user_id, e.target.value)}
                    >
                      <option value="user">Пользователь</option>
                      <option value="admin">Администратор</option>
                      <option value="curator">Куратор</option>
                      <option value="staff">Сотрудник</option>
                      <option value="tour_guide">Организатор туров</option>
                      <option value="auction_participant">Участник аукциона</option>
                    </select>
                  </td>
                  <td>{new Date(user.created_at).toLocaleDateString()}</td>
                  <td>
                    <ActionButton 
                      onClick={() => updateUserRole(user.user_id, 'admin')}
                      style={{ backgroundColor: '#6200ee', color: 'white' }}
                    >
                      Сделать админом
                    </ActionButton>
                    <ActionButton 
                      onClick={() => deleteUser(user.user_id)}
                      style={{ backgroundColor: '#f44336', color: 'white' }}
                    >
                      Удалить
                    </ActionButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      )}
    </PanelContainer>
  );
};

export default AdminPanel;