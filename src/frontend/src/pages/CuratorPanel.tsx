// src/pages/CuratorPanel.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Artwork, Collection } from '../types';

const PanelContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const PanelHeader = styled.h2`
  color: #333;
  margin-bottom: 1.5rem;
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #ddd;
  margin-bottom: 1.5rem;
`;

const TabButton = styled.button<{ active: boolean }>`
  padding: 0.75rem 1.5rem;
  border: none;
  background: ${({ active }) => active ? '#6200ee' : '#f5f5f5'};
  color: ${({ active }) => active ? 'white' : '#333'};
  cursor: pointer;
  border-radius: 4px 4px 0 0;
  margin-right: 0.25rem;

  &:hover {
    background: ${({ active }) => active ? '#3700b3' : '#e0e0e0'};
  }
`;

const TabContent = styled.div`
  padding: 1.5rem 0;
`;

const CollectionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const CollectionCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
`;

const CollectionTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  color: #333;
`;

const CollectionDescription = styled.p`
  margin: 0 0 1rem 0;
  color: #666;
`;

const CollectionMeta = styled.div`
  display: flex;
  justify-content: space-between;
  color: #888;
  font-size: 0.9rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
`;

const Button = styled.button`
  padding: 0.75rem;
  background-color: #6200ee;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #3700b3;
  }
`;

const CuratorPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'collections' | 'ai-curation'>('dashboard');
  const [collections, setCollections] = useState<Collection[]>([]);
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  
  // State for creating new collection
  const [collectionName, setCollectionName] = useState('');
  const [collectionDescription, setCollectionDescription] = useState('');
  const [collectionTheme, setCollectionTheme] = useState('');
  const [selectedArtworks, setSelectedArtworks] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch collections
        const collectionsResponse = await axios.get('http://localhost:5000/api/ai/collections', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        
        // Fetch artworks
        const artworksResponse = await axios.get('http://localhost:5000/api/artworks', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        
        setCollections(collectionsResponse.data);
        setArtworks(artworksResponse.data);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCreateCollection = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await axios.post(
        'http://localhost:5000/api/ai/collections/generate',
        {
          name: collectionName,
          description: collectionDescription,
          theme: collectionTheme,
          artworks: selectedArtworks,
          isPublic: false
        },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      // Reset form
      setCollectionName('');
      setCollectionDescription('');
      setCollectionTheme('');
      setSelectedArtworks([]);
      
      // Reload collections
      const response = await axios.get('http://localhost:5000/api/ai/collections', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      
      setCollections(response.data);
    } catch (error) {
      console.error('Ошибка при создании коллекции:', error);
    }
  };

  const handleArtworkSelection = (artworkId: number) => {
    setSelectedArtworks(prev => 
      prev.includes(artworkId) 
        ? prev.filter(id => id !== artworkId) 
        : [...prev, artworkId]
    );
  };

  return (
    <PanelContainer>
      <PanelHeader>Панель куратора</PanelHeader>
      
      <TabsContainer>
        <TabButton 
          active={activeTab === 'dashboard'} 
          onClick={() => setActiveTab('dashboard')}
        >
          Панель управления
        </TabButton>
        <TabButton 
          active={activeTab === 'collections'} 
          onClick={() => setActiveTab('collections')}
        >
          Коллекции
        </TabButton>
        <TabButton 
          active={activeTab === 'ai-curation'} 
          onClick={() => setActiveTab('ai-curation')}
        >
          AI-курирование
        </TabButton>
      </TabsContainer>
      
      <TabContent>
        {activeTab === 'dashboard' && (
          <div>
            <h3>Статистика</h3>
            <p>Активных коллекций: {collections.length}</p>
            <p>Всего экспонатов: {artworks.length}</p>
          </div>
        )}
        
        {activeTab === 'collections' && (
          <div>
            <h3>Управление коллекциями</h3>
            {loading ? (
              <p>Загрузка коллекций...</p>
            ) : (
              <CollectionsGrid>
                {collections.map(collection => (
                  <CollectionCard key={collection.collection_id}>
                    <CollectionTitle>{collection.name}</CollectionTitle>
                    <CollectionDescription>
                      {collection.description || 'Без описания'}
                    </CollectionDescription>
                    <CollectionMeta>
                      <span>{collection.artworks_count || 0} экспонатов</span>
                      <span>{collection.theme || 'Без темы'}</span>
                    </CollectionMeta>
                  </CollectionCard>
                ))}
              </CollectionsGrid>
            )}
          </div>
        )}
        
        {activeTab === 'ai-curation' && (
          <div>
            <h3>Создать новую коллекцию</h3>
            <Form onSubmit={handleCreateCollection}>
              <div>
                <label htmlFor="name">Название коллекции:</label>
                <Input
                  id="name"
                  type="text"
                  value={collectionName}
                  onChange={(e) => setCollectionName(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="description">Описание:</label>
                <TextArea
                  id="description"
                  value={collectionDescription}
                  onChange={(e) => setCollectionDescription(e.target.value)}
                />
              </div>
              
              <div>
                <label htmlFor="theme">Тема:</label>
                <Input
                  id="theme"
                  type="text"
                  value={collectionTheme}
                  onChange={(e) => setCollectionTheme(e.target.value)}
                />
              </div>
              
              <div>
                <label>Выберите экспонаты:</label>
                <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #ddd', borderRadius: '4px', padding: '0.5rem' }}>
                  {artworks.map(artwork => (
                    <div key={artwork.artwork_id} style={{ marginBottom: '0.5rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                          type="checkbox"
                          checked={selectedArtworks.includes(artwork.artwork_id)}
                          onChange={() => handleArtworkSelection(artwork.artwork_id)}
                          style={{ marginRight: '0.5rem' }}
                        />
                        {artwork.title} - {artwork.artist_name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <Button type="submit">Создать коллекцию</Button>
            </Form>
          </div>
        )}
      </TabContent>
    </PanelContainer>
  );
};

export default CuratorPanel;