import { render, screen, fireEvent } from '@testing-library/react';
import PostDropdown from './PostDropdown';

describe('PostDropdown', () => {
  const mockPosts = [
    { id: 1, title: 'Post 1' },
    { id: 2, title: 'Post 2' },
    { id: 3, title: 'Post 3' },
  ];

  const mockOnSelect = jest.fn();

  it('renders without crashing', () => {
    render(<PostDropdown posts={mockPosts} onSelect={mockOnSelect} />);
  });

  it('displays the correct number of options', () => {
    render(<PostDropdown posts={mockPosts} onSelect={mockOnSelect} />);
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(mockPosts.length + 1); // +1 for the default option
  });

  it('displays the correct default option', () => {
    render(<PostDropdown posts={mockPosts} onSelect={mockOnSelect} />);
    expect(screen.getByText('Select a Post')).toBeInTheDocument();
  });

  it('displays the correct post titles', () => {
    render(<PostDropdown posts={mockPosts} onSelect={mockOnSelect} />);
    mockPosts.forEach(post => {
      expect(screen.getByText(post.title)).toBeInTheDocument();
    });
  });

  it('calls onSelect with the correct post id when an option is selected', () => {
    render(<PostDropdown posts={mockPosts} onSelect={mockOnSelect} />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '2' } });
    expect(mockOnSelect).toHaveBeenCalledWith(2);
  });

  it('sets the correct value when selectedPostId is provided', () => {
    render(<PostDropdown posts={mockPosts} onSelect={mockOnSelect} selectedPostId={2} />);
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('2');
  });

  it('sets empty value when selectedPostId is not provided', () => {
    render(<PostDropdown posts={mockPosts} onSelect={mockOnSelect} />);
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('');
  });

  it('handles empty posts array', () => {
    render(<PostDropdown posts={[]} onSelect={mockOnSelect} />);
    expect(screen.getByText('Select a Post')).toBeInTheDocument();
    const options = screen.queryAllByRole('option');
    expect(options).toHaveLength(1); // Only the default option
  });
});
