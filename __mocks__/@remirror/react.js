export const useChainedCommands = jest.fn().mockImplementation(() => ({
  toggleBold: jest.fn().mockImplementation(() => ({
    focus: jest.fn().mockImplementation(() => ({
      run: jest.fn(),
    })),
  })),
  toggleHeading: jest.fn().mockImplementation(() => ({
    focus: jest.fn().mockImplementation(() => ({
      run: jest.fn(),
    })),
  })),
  toggleItalic: jest.fn().mockImplementation(() => ({
    focus: jest.fn().mockImplementation(() => ({
      run: jest.fn(),
    })),
  })),
  toggleUnderline: jest.fn().mockImplementation(() => ({
    focus: jest.fn().mockImplementation(() => ({
      run: jest.fn(),
    })),
  })),
  toggleStrike: jest.fn().mockImplementation(() => ({
    focus: jest.fn().mockImplementation(() => ({
      run: jest.fn(),
    })),
  })),
  toggleCodeBlock: jest.fn().mockImplementation(() => ({
    focus: jest.fn().mockImplementation(() => ({
      run: jest.fn(),
    })),
  })),
  toggleBulletList: jest.fn().mockImplementation(() => ({
    focus: jest.fn().mockImplementation(() => ({
      run: jest.fn(),
    })),
  })),
  toggleOrderedList: jest.fn().mockImplementation(() => ({
    focus: jest.fn().mockImplementation(() => ({
      run: jest.fn(),
    })),
  })),
}));

export const useActive = jest.fn().mockImplementation(() => ({
  bold: jest.fn(),
  heading: jest.fn(),
  italic: jest.fn(),
  underline: jest.fn(),
  strike: jest.fn(),
  codeBlock: jest.fn(),
  bulletList: jest.fn(),
  orderedList: jest.fn(),
  link: jest.fn(),
  image: jest.fn(),
}));

export const EditorComponent = () => <>mockComponent</>;
