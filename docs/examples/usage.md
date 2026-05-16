# Usage {#usage}

There are several ways to explore the features of **Sanity Structure Tool**. Whether you prefer reading code, seeing a live demo, or running the studio locally, we have you covered.

## 1. Documentation (Recommended) {#documentation-recommended}

The fastest way to understand a specific property is to browse the individual example pages in the sidebar. Each page focuses on a single field and provides clear, copy-pasteable snippets.

- **[title](./title)**
- **[schemaType](./schema-type)**
- **[icon](./icon)**
- **[singleton](./singleton)**
- **[children](./children)**
- **...and more in the sidebar!**

## 2. Interactive Live Demo {#interactive-live-demo}

If you want to see the **Sanity Structure Tool** in action without setting anything up, visit our live demo studio:

👉 **[Live Demo Studio](https://sanity-structure-tool-examples.nishargshah.dev/)**

::: info Note
You will need to log in with your own Sanity account and **send an access request** to the owner. Please note that it can take up to **24 hours** to resolve the request. Since the basic Sanity plan has a limit of 20 users, access is managed manually to ensure everyone has a chance to explore the demo.
:::

## 3. Local Development {#local-development}

For developers who want to experiment with the code and see it run on their own machine, you can clone the repository and run the example studio locally.

### Steps: {#steps}

1.  **Repository Setup**: Follow our **[Contributing Guide](../contribute/guide)** to clone the repo and install dependencies.
2.  **Environment Setup**: Create a `.env` file in the `apps/studio` folder with your own `projectId` and `dataset`.
3.  **Import Sample Data**: We provide a production data snapshot in the `data` folder. You can import it using the [Sanity CLI](https://www.sanity.io/docs/content-lake/importing-data):
    ```sh
    sanity dataset import data/production.tar.gz <your-dataset-name>
    ```
4.  **Run the Studio**:
    ```sh
    pnpm studio:dev
    ```

This setup gives you a fully functional playground to test complex structures, roles, and workspaces.
