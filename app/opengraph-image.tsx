import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = "Lenny's Wisdom Wall - Product wisdom from Lenny's Podcast";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFF8F0',
          padding: '60px',
        }}
      >
        {/* Main Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          {/* Title */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              color: '#1F2937',
              marginBottom: 24,
              display: 'flex',
              alignItems: 'center',
              gap: 20,
            }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: 16,
                overflow: 'hidden',
                display: 'flex',
              }}
            >
              <img
                src="https://media.licdn.com/dms/image/v2/D5603AQEtN0NPUcDLrA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1668720550515?e=2147483647&v=beta&t=oC9mjouEijfAiMcf7JQJfGTMKlXJXzgQkUHOHa5hKFE"
                width="80"
                height="80"
                alt="Lenny"
                style={{ objectFit: 'cover' }}
              />
            </div>
            Lenny's Wisdom Wall
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 32,
              color: '#6B7280',
              marginBottom: 48,
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            Explore key product concepts and curated contradictions from Lenny's
            podcast guests
          </div>

          {/* Features */}
          <div
            style={{
              display: 'flex',
              gap: 32,
              marginBottom: 40,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'white',
                padding: '20px 32px',
                borderRadius: 12,
                border: '2px solid #FF6B35',
              }}
            >
              <div style={{ fontSize: 28, fontWeight: '600', color: '#FF6B35' }}>
                📚 Concepts
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'white',
                padding: '20px 32px',
                borderRadius: 12,
                border: '2px solid #FF6B35',
              }}
            >
              <div style={{ fontSize: 28, fontWeight: '600', color: '#FF6B35' }}>
                🎯 Contradictions
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              fontSize: 24,
              color: '#9CA3AF',
              fontStyle: 'italic',
            }}
          >
            Product wisdom isn't black and white
          </div>
        </div>

        {/* Bottom accent */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 8,
            backgroundColor: '#FF6B35',
            display: 'flex',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
