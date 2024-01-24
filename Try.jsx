import React, { memo, useState } from 'react';

const Try = memo(({tryInfo})=>{
    const [ok, setOk] = useState(tryInfo);
    const onClick = () =>{
        setOk(1);
    }
    return (
      <li>
        <div>{tryInfo.try}</div>
        <div>{ok}</div>
      </li>
    );
  }
);
Try.displayName = 'Try';

export default Try;