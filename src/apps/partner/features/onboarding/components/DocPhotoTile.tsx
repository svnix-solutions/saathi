import React from 'react';
import { PhotoTile } from '@/native/ui';

/** A document photo slot: dashed "Add …" with a camera, or mint "… added" with a tick. */
export function DocPhotoTile({ added, addLabel, addedLabel, onPress }: {
  added: boolean; addLabel: string; addedLabel: string; onPress: () => void;
}) {
  return <PhotoTile added={added} icon={added ? 'check' : 'cam'} label={added ? addedLabel : addLabel} onPress={onPress} />;
}

export default DocPhotoTile;
