import React from 'react';
import { useParams } from 'react-router-dom'; 
import SimilarProfiles from '../SimilarProfiles';

const SimilarProfilesPage = () => {
  const { userId } = useParams();
  return (
    <div className="container mx-auto">
      <SimilarProfiles userId={userId} />
    </div>
  );
};

export default SimilarProfilesPage;