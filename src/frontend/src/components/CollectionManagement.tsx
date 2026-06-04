// src/frontend/src/components/CollectionManagement.tsx
import React, { useState } from 'react';
import styled from 'styled-components';

const ManagementContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  align-items: center;
`;

const SearchBar = styled.input`
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 300px;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #2980b9;
  }
`;

const CollectionCard = styled.div`
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  border-left: 4px solid #3498db;
`;

const CollectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const CollectionTitle = styled.h3`
  margin: 0;
  color: #2c3e50;
`;

const CollectionMeta = styled.div`
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const CollectionDescription = styled.p`
  color: #34495e;
  margin: 0.5rem 0;
`;

const CollectionActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const ActionButton = styled.button`
  padding: 0.25rem 0.5rem;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 0.8rem;

  &.edit {
    background-color: #f39c12;
    color: white;
  }

  &.delete {
    background-color: #e74c3c;
    color: white;
  }

  &.view {
    background-color: #3498db;
    color: white;
  }
`;

interface Collection {
  collection_id: number;
  name: string;
  description: string;
  curator: string;
  is_ai_generated: boolean;
  created_at: string;
  artworks_count: number;
  theme: string;
  isPublic: boolean;
}

interface CollectionManagementProps {
  collections: Collection[];
  onEdit: (collection: Collection) => void;
  onDelete: (collectionId: number) => void;
  onView: (collection: Collection) => void;
  onCreate: () => void;
  userRole: string;
}

const CollectionManagement: React.FC<CollectionManagementProps> = ({ 
  collections, 
  onEdit, 
  onDelete, 
  onView,
  onCreate,
  userRole
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCollections = searchTerm
    ? collections.filter(collection => 
        collection.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        collection.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        collection.theme.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : collections;

  return (
    <ManagementContainer>
      <Toolbar>
        <h2>Manage Collections</h2>
        <div>
          <SearchBar 
            type="text" 
            placeholder="Search collections..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button onClick={onCreate}>Create New Collection</Button>
        </div>
      </Toolbar>
      
      {filteredCollections.map(collection => (
        <CollectionCard key={collection.collection_id}>
          <CollectionHeader>
            <CollectionTitle>{collection.name}</CollectionTitle>
            <div>
              {collection.is_ai_generated && (
                <span style={{ 
                  marginLeft: '0.5rem', 
                  padding: '0.2rem 0.4rem', 
                  backgroundColor: '#e8f4fd', 
                  color: '#1d8cf8', 
                  borderRadius: '4px',
                  fontSize: '0.8rem'
                }}>
                  AI Generated
                </span>
              )}
              {collection.isPublic && (
                <span style={{ 
                  marginLeft: '0.5rem', 
                  padding: '0.2rem 0.4rem', 
                  backgroundColor: '#e8fbee', 
                  color: '#28a745', 
                  borderRadius: '4px',
                  fontSize: '0.8rem'
                }}>
                  Public
                </span>
              )}
            </div>
          </CollectionHeader>
          
          <CollectionMeta>
            Created by: {collection.curator} | {collection.artworks_count} artworks | Theme: {collection.theme}
          </CollectionMeta>
          
          <CollectionDescription>
            {collection.description}
          </CollectionDescription>
          
          <CollectionActions>
            <ActionButton className="view" onClick={() => onView(collection)}>
              View
            </ActionButton>
            {(userRole === 'admin' || userRole === 'curator') && (
              <>
                <ActionButton className="edit" onClick={() => onEdit(collection)}>
                  Edit
                </ActionButton>
                <ActionButton className="delete" onClick={() => onDelete(collection.collection_id)}>
                  Delete
                </ActionButton>
              </>
            )}
          </CollectionActions>
        </CollectionCard>
      ))}
    </ManagementContainer>
  );
};

export default CollectionManagement;