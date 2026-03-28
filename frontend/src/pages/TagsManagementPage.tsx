import { useEffect, useState, useCallback, useMemo } from "react";
import { Box, Typography, Stack, CircularProgress, Alert } from "@mui/material";
import TagsToolBar from "../components/TagsToolBar";
import TagsTable from "../components/TagsTable";
import http from "../api/http";

interface Tag {
  id: string;
  tagName: string;
  tagKey: string;
  color?: string;
}

const mapDto = (dto: { id: string; code: string; label: string; color?: string }): Tag => ({
  id: dto.id,
  tagName: dto.label,
  tagKey: dto.code,
  color: dto.color,
});

const TagsManagementPage = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("all");

  const fetchTags = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await http.get("/backoffice/products/tags");
      setTags(data.map(mapDto));
    } catch {
      setError("Failed to fetch tags");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  const handleEditTag = async (id: string, label: string, key: string, color: string) => {
    try {
      await http.put(`/backoffice/products/tags/${id}`, { code: key, label, color });
      await fetchTags();
    } catch {
      setError("Failed to update tag");
    }
  };

  const handleDeleteTag = async (id: string) => {
    try {
      await http.delete(`/backoffice/products/tags/${id}`);
      await fetchTags();
    } catch {
      setError("Failed to delete tag");
    }
  };

  const filteredTags = useMemo(() => {
    let result = [...tags];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) => t.tagName.toLowerCase().includes(q) || t.tagKey.toLowerCase().includes(q)
      );
    }

    if (sort === "all") {
      result.sort((a, b) => a.tagName.localeCompare(b.tagName));
    }
    // "active" / "inactive" would need createdAt from backend — extend as needed

    return result;
  }, [tags, search, sort]);

  return (
    <Box sx={{ mx: { xs: 2, sm: 3, md: 4, lg: 8, xl: 20 }, my: 4 }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
            Tags Management
          </Typography>
          <Typography variant="body1" gutterBottom color="text.secondary">
            Manage product tags that determine how products are rendered
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        <TagsToolBar
          totalTags={tags.length}
          showingTags={filteredTags.length}
          onSearch={setSearch}
          onSortChange={setSort}
          onTagCreated={fetchTags}
        />

        {loading ? (
          <Box display="flex" justifyContent="center" py={6}>
            <CircularProgress />
          </Box>
        ) : (
          <TagsTable tags={filteredTags} onEditTag={handleEditTag} onDeleteTag={handleDeleteTag} />
        )}
      </Stack>
    </Box>
  );
};

export default TagsManagementPage;
