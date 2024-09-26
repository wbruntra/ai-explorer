# AI Explorer

This project demonstrates how to use OpenAI's API. Follow the steps below to set up and run the project on your MacBook.

## Prerequisites

1. **Node.js and npm**: Ensure you have Node.js and npm installed. You can download them from [nodejs.org](https://nodejs.org/).
2. **Git**: Ensure you have Git installed. You can download it from [git-scm.com](https://git-scm.com/).

## Setup

1. **Clone the repository**: Open your terminal and run the following command to clone the repository:

   ```sh
   git clone https://github.com/wbruntra/ai-explorer
   ```

2. **Navigate to the project directory**:

   ```sh
   cd ai-explorer
   ```

3. **Install dependencies**: Run the following command to install the required dependencies:

   ```sh
   npm install
   ```

4. **Add your OpenAI API key**:
   - Create the file `secrets.js`.
   - Copy `secrets.example.js`, replace the placeholder API key with your actual OpenAI API key.

## Running the Project

1. **Run the script**: Execute the following command to run the project:

   ```sh
   node test.js
   ```

2. **View the output**: The script will read the content from `input.txt`, send it to the OpenAI API for summarization, and print the response to the terminal.

## Notes

- The useful files are `ask.js` and `analyze.js`, which provide examples of how to interact with the OpenAI API. Modify them to work with the ChatGPT model.

## Troubleshooting

- If you encounter any issues, ensure that all dependencies are correctly installed and that your API key is valid.
- Check the terminal output for any error messages and follow the instructions provided.

That's it! You should now be able to run the project and see the summarized text output.
