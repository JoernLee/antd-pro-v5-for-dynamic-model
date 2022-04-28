import { Button, Input } from 'antd';
import React, { useState } from 'react';

export const Test = () => {
  const [animal, setAnimal] = useState('dog');

  return (
    <div>
      <Button onClick={() => setAnimal('cat')}>change</Button>
      <Input value={animal} />
    </div>
  );
};
