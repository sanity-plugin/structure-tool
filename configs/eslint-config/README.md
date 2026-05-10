# @structure-tool/eslint-config

Shared ESLint configuration for the monorepo.

## Usage

### Eslint Configuration

```js
// eslint.config.js
import config from '@structure-tool/eslint-config/base';

export default config;
```

### Internal Configuration

```js
// eslint.config.js
import config from '@structure-tool/eslint-config/internal';

export default config;
```

### Root Configuration

```js
// eslint.config.js
import config from '@structure-tool/eslint-config/root';

export default config;
```

### Utils

```js
// eslint.config.js
import { defineConfig, globalIgnores } from '@structure-tool/eslint-config/utils';
```
