package com.englishcareer.auth.entity;

import com.englishcareer.common.model.BaseEntity;
import com.vladmihalcea.hibernate.type.json.JsonType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Type;

import java.util.ArrayList;
import java.util.List;

/**
 * User Profile containing professional and learning preferences
 */
@Entity
@Table(name = "user_profiles")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(callSuper = false)
@ToString(exclude = {"user"})
public class UserProfile extends BaseEntity {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(length = 50)
    private String professionalArea;

    @Column(length = 20)
    private String currentLevel;

    @Column(length = 100)
    private String learningGoal;

    @Column(name = "daily_minutes")
    @Builder.Default
    private Integer dailyMinutes = 30;

    @Type(JsonType.class)
    @Column(name = "weak_areas", columnDefinition = "jsonb")
    @Builder.Default
    private List<String> weakAreas = new ArrayList<>();

}
