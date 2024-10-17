import { render, screen, fireEvent } from '@testing-library/react';
import PostDropdown from '../components/PostDropdown';

describe('PostDropdown edge cases', () => {
  const mockPosts = [
    { id: 1, title: 'Post 1' },
    { id: 2, title: 'Post 2' },
    { id: 3, title: 'Post 3' },
  ];

  const mockOnSelect = jest.fn();

  it('renders correctly with empty posts array', () => {
    render(<PostDropdown posts={[]} onSelect={mockOnSelect} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('Select a Post')).toBeInTheDocument();
    expect(screen.queryAllByRole('option')).toHaveLength(1);
  });

  it('handles undefined selectedPostId', () => {
    render(<PostDropdown posts={mockPosts} onSelect={mockOnSelect} />);
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('');
  });

  it('calls onSelect with correct id when selecting a post', () => {
    render(<PostDropdown posts={mockPosts} onSelect={mockOnSelect} />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '2' } });
    expect(mockOnSelect).toHaveBeenCalledWith(2);
  });

  it('displays correct number of options including default option', () => {
    render(<PostDropdown posts={mockPosts} onSelect={mockOnSelect} />);
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(mockPosts.length + 1);
  });

  it('sets correct value attribute for each option', () => {
    render(<PostDropdown posts={mockPosts} onSelect={mockOnSelect} />);
    const options = screen.getAllByRole('option');
    expect(options[0]).toHaveValue('');
    mockPosts.forEach((post, index) => {
      expect(options[index + 1]).toHaveValue(post.id.toString());
    });
  });

  it('displays correct text for each option', () => {
    render(<PostDropdown posts={mockPosts} onSelect={mockOnSelect} />);
    expect(screen.getByText('Select a Post')).toBeInTheDocument();
    mockPosts.forEach(post => {
      expect(screen.getByText(post.title)).toBeInTheDocument();
    });
  });
});
