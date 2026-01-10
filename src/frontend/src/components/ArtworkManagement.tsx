// src/frontend/src/components/ArtworkManagement.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Artwork } from '../types';

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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 0.75rem;
  background-color: #f8f9fa;
  border-bottom: 2px solid #dee2e6;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8f9fa;
  }

  &:hover {
    background-color: #e9ecef;
  }
`;

const TableCell = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid #dee2e6;
`;

const ActionButton = styled.button`
  padding: 0.25rem 0.5rem;
  margin-right: 0.25rem;
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

interface ArtworkManagementProps {
  artworks: Artwork[];
  onEdit: (artwork: Artwork) => void;
  onDelete: (artworkId: number) => void;
  onView: (artwork: Artwork) => void;
  userRole: string;
}

const ArtworkManagement: React.FC<ArtworkManagementProps> = ({ 
  artworks, 
  onEdit, 
  onDelete, 
  onView,
  userRole
}) => {
  const [filteredArtworks, setFilteredArtworks] = useState<Artwork[]>(artworks);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!searchTerm) {
      setFilteredArtworks(artworks);
    } else {
      const term = searchTerm.toLowerCase();
      setFilteredArtworks(
        artworks.filter(artwork => 
          artwork.title.toLowerCase().includes(term) || 
          artwork.artist_name.toLowerCase().includes(term) ||
          (artwork.style && artwork.style.toLowerCase().includes(term)) ||
          (artwork.tags.some(tag => tag.toLowerCase().includes(term)))
        )
      );
    }
  }, [searchTerm, artworks]);

  return (
    <ManagementContainer>
      <Toolbar>
        <h2>Manage Artworks</h2>
        <div>
          <SearchBar 
            type="text" 
            placeholder="Search artworks..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button>Add New Artwork</Button>
        </div>
      </Toolbar>
      
      <Table>
        <thead>
          <tr>
            <TableHeader>ID</TableHeader>
            <TableHeader>Title</TableHeader>
            <TableHeader>Artist</TableHeader>
            <TableHeader>Style</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Actions</TableHeader>
          </tr>
        </thead>
        <tbody>
          {filteredArtworks.map(artwork => (
            <TableRow key={artwork.artwork_id}>
              <TableCell>{artwork.artwork_id}</TableCell>
              <TableCell>{artwork.title}</TableCell>
              <TableCell>{artwork.artist_name}</TableCell>
              <TableCell>{artwork.style}</TableCell>
              <TableCell>
                <span style={{
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  backgroundColor: artwork.status === 'published' ? '#d4edda' : 
                                  artwork.status === 'draft' ? '#fff3cd' : '#f8d7da',
                  color: artwork.status === 'published' ? '#155724' : 
                         artwork.status === 'draft' ? '#856404' : '#721c24'
                }}>
                  {artwork.status}
                </span>
              </TableCell>
              <TableCell>
                <ActionButton className="view" onClick={() => onView(artwork)}>
                  View
                </ActionButton>
                {(userRole === 'admin' || userRole === 'curator') && (
                  <>
                    <ActionButton className="edit" onClick={() => onEdit(artwork)}>
                      Edit
                    </ActionButton>
                    <ActionButton className="delete" onClick={() => onDelete(artwork.artwork_id)}>
                      Delete
                    </ActionButton>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </ManagementContainer>
  );
};

export default ArtworkManagement;