'use server'

export async function getGoogleReviews(placeId: string) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  
  if (!apiKey) {
    console.error('❌ API key is missing');
    throw new Error('Google Places API key is not configured');
  }

  console.log('🔍 Fetching reviews for place:', placeId);
  
  try {
    const url = `https://places.googleapis.com/v1/places/${placeId}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        // Fixed field name: userRatingCount instead of userRatingsTotal
        'X-Goog-FieldMask': 'reviews,rating,userRatingCount,displayName'
      },
      cache: 'no-store'
    });

    console.log('📊 Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API Error Response:', errorText);
      throw new Error(`API request failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ Reviews fetched successfully:', data);
    return data;
    
  } catch (error) {
    console.error('💥 Error in getGoogleReviews:', error);
    throw error;
  }
}