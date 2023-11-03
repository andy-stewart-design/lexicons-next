'use client';

import ColorPicker from '@components/ColorPicker';

export default function Play() {
  return (
    <div
      style={{
        height: '100lvh',
        padding: 'var(--size-6)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          background: 'var(--gray-950)',
          borderRadius: 'var(--size-3)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gap: 'var(--size-8)',
            flexGrow: 1,
            maxWidth: '320px',
          }}
        >
          <ColorPicker
            primaryColor="--accent-color-oklch"
            secondaryColor="--analogous-color-oklch"
          />
        </div>
      </div>
    </div>
  );
}
