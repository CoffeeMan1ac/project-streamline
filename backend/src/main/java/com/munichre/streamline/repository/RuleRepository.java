package com.munichre.streamline.repository;

import com.munichre.streamline.model.Rule;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface RuleRepository extends JpaRepository<Rule, UUID> {

  /*


  findBy     ActiveTrue     OrderBy    PriorityAsc
    ↓           ↓             ↓            ↓
  SELECT      WHERE         ORDER BY     ASC
   *          active=true              priority
  FROM rules


  So in the end is = "SELECT * FROM rules WHERE active = true ORDER BY priority ASC"

      */

  /** Fetch all active rules, ordered by priority (lower = first). */
  List<Rule> findByProductIdAndActiveTrueOrderByPriorityAsc(UUID productId);

  // interface

  // WHAT IT DOES:
  // rule.setId(UUID.fromString(rs.getString("id")));
  // rule.setName(rs.getString("name"));
  // rule.setConditionField(rs.getString("condition_field"));
  // rule.setConditionOperator(rs.getString("condition_operator"));
  // rule.setConditionValue(rs.getString("condition_value"));
  // rule.setActionType(rs.getString("action_type"));
  // rule.setActionReason(rs.getString("action_reason"));
  // rule.setPriority(rs.getInt("priority"));
  // rule.setActive(rs.getBoolean("active"));

  /** Fetch all inactive rules, ordered by priority (lower = first). */
  List<Rule> findByProductIdAndActiveFalseOrderByPriorityAsc(UUID productId);

  /** Fetch all rules, ordered by priority (lower = first). */
  List<Rule> findByProductIdOrderByPriorityAsc(UUID productId);

  // Clear and flush, because otherwise we return stale data since these are bulk updates.
  @Modifying(clearAutomatically = true, flushAutomatically = true)
  @Query(
      """
    UPDATE Rule r
    SET r.priority = r.priority + 1
    WHERE r.product.id = :productId
      AND r.priority BETWEEN :start AND :end
  """)
  void incrementPriorityBetween(UUID productId, Integer start, Integer end);

  @Modifying(clearAutomatically = true, flushAutomatically = true)
  @Query(
      """
    UPDATE Rule r
    SET r.priority = r.priority - 1
    WHERE r.product.id = :productId
      AND r.priority BETWEEN :start AND :end
  """)
  void decrementPriorityBetween(UUID productId, Integer start, Integer end);
}
