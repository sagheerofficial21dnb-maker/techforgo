<?php
/**
 * The template for displaying the front page
 *
 * Includes Hero introduction, Featured section, Main grid, and Category feeds.
 *
 * @package TechForGo
 * @since 1.0.2
 */

get_header();
?>

<main id="primary" class="tfg-site-main">
	<div class="tfg-container">

		<!-- 1. HERO INTRODUCTION SECTION -->
		<section class="tfg-hero-intro-banner" style="margin-top: 24px; margin-bottom: 24px; padding: 32px; background: #FAFAFA; border: 1px solid #E5E5E5; border-radius: 12px;">
			<div style="max-width: 760px;">
				<span class="tfg-category-label" style="display: block; margin-bottom: 8px;">
					<?php esc_html_e( 'Engineering Journal &middot; Published Daily', 'techforgo' ); ?>
				</span>
				<h1 style="font-size: 28px; font-weight: 800; line-height: 1.25; margin-top: 0; margin-bottom: 12px; color: #1A1A1A;">
					<?php esc_html_e( 'In-Depth Architectural Teardowns for Modern Technologists', 'techforgo' ); ?>
				</h1>
				<p style="font-size: 15px; color: #666666; line-height: 1.6; margin-bottom: 16px;">
					<?php esc_html_e( 'Welcome to TechForGo. We deliver peer-reviewed technical inquiries into cryogenic quantum buses, Linux kernel eBPF pipelines, post-quantum hardware enclaves, and distributed systems.', 'techforgo' ); ?>
				</p>
				<div style="display: flex; gap: 12px; flex-wrap: wrap;">
					<a href="<?php echo esc_url( home_url( '/blog/' ) ); ?>" style="padding: 10px 18px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; background: #0066CC; color: #FFFFFF; border-radius: 4px;">
						<?php esc_html_e( 'Browse 10-Article Journal &rarr;', 'techforgo' ); ?>
					</a>
					<a href="<?php echo esc_url( home_url( '/about/' ) ); ?>" style="padding: 10px 18px; font-size: 12px; font-weight: 600; background: #FFFFFF; color: #1A1A1A; border: 1px solid #E5E5E5; border-radius: 4px;">
						<?php esc_html_e( 'Our Editorial Charter', 'techforgo' ); ?>
					</a>
				</div>
			</div>
		</section>

		<!-- FEATURED LEAD ARTICLE -->
		<?php
		$tfg_lead_query = new WP_Query(
			array(
				'posts_per_page'      => 1,
				'post_status'         => 'publish',
				'ignore_sticky_posts' => false,
			)
		);

		$featured_post_ids = array();

		if ( $tfg_lead_query->have_posts() ) :
			while ( $tfg_lead_query->have_posts() ) :
				$tfg_lead_query->the_post();
				$featured_post_ids[] = get_the_ID();
				?>
				<section class="tfg-hero-section" aria-label="<?php esc_attr_e( 'Featured Lead Story', 'techforgo' ); ?>">
					<div class="tfg-hero-grid">
						<div class="tfg-hero-media">
							<a href="<?php the_permalink(); ?>">
								<?php
								if ( has_post_thumbnail() ) {
									the_post_thumbnail( 'techforgo-hero', array( 'class' => 'tfg-hero-image', 'loading' => 'eager' ) );
								} else {
									?>
									<div class="tfg-media-placeholder"></div>
									<?php
								}
								?>
							</a>
						</div>
						<div class="tfg-hero-content">
							<div class="tfg-meta-row">
								<?php
								$categories = get_the_category();
								if ( ! empty( $categories ) ) :
									?>
									<a href="<?php echo esc_url( get_category_link( $categories[0]->term_id ) ); ?>" class="tfg-category-label">
										<?php echo esc_html( $categories[0]->name ); ?>
									</a>
									<span aria-hidden="true">&middot;</span>
								<?php endif; ?>
								<time datetime="<?php echo esc_attr( get_the_date( DATE_W3C ) ); ?>"><?php echo esc_html( get_the_date( 'M j, Y' ) ); ?></time>
								<span aria-hidden="true">&middot;</span>
								<span><?php echo esc_html( techforgo_reading_time() ); ?></span>
							</div>

							<h2 class="tfg-hero-title">
								<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
							</h2>

							<div class="tfg-hero-excerpt">
								<?php the_excerpt(); ?>
							</div>

							<div class="tfg-hero-author-strip">
								<div style="display: flex; align-items: center; gap: 8px;">
									<?php echo get_avatar( get_the_author_meta( 'ID' ), 28, '', '', array( 'class' => 'tfg-avatar-sm' ) ); ?>
									<span style="font-weight: 600; color: #1A1A1A;"><?php the_author(); ?></span>
								</div>
								<a href="<?php the_permalink(); ?>" class="tfg-read-more-btn"><?php esc_html_e( 'Read Full Analysis &rarr;', 'techforgo' ); ?></a>
							</div>
						</div>
					</div>
				</section>
				<?php
			endwhile;
			wp_reset_postdata();
		endif;
		?>

		<!-- 2. FEATURED SECTION (SPOTLIGHT GRID) -->
		<?php
		$tfg_spotlight_query = new WP_Query(
			array(
				'posts_per_page'      => 3,
				'post_status'         => 'publish',
				'post__not_in'        => $featured_post_ids,
				'ignore_sticky_posts' => true,
			)
		);

		if ( $tfg_spotlight_query->have_posts() ) :
			?>
			<section class="tfg-spotlight-section" aria-label="<?php esc_attr_e( 'Featured Inquiries', 'techforgo' ); ?>">
				<div class="tfg-section-header">
					<div>
						<span class="tfg-category-label" style="display: block; margin-bottom: 2px;"><?php esc_html_e( 'Spotlight Investigations', 'techforgo' ); ?></span>
						<h2 class="tfg-section-title"><?php esc_html_e( 'Featured Technical Dispatches', 'techforgo' ); ?></h2>
					</div>
					<a href="<?php echo esc_url( home_url( '/blog/' ) ); ?>" class="tfg-view-all-link"><?php esc_html_e( 'View Complete Archive &rarr;', 'techforgo' ); ?></a>
				</div>
				<div class="tfg-spotlight-grid">
					<?php
					while ( $tfg_spotlight_query->have_posts() ) :
						$tfg_spotlight_query->the_post();
						$featured_post_ids[] = get_the_ID();
						get_template_part( 'template-parts/content-card' );
					endwhile;
					wp_reset_postdata();
					?>
				</div>
			</section>
			<?php
		endif;
		?>

		<!-- 3. MAIN GRID (70% CONTENT, 30% SIDEBAR) -->
		<div class="tfg-layout-split tfg-mt-section">
			<div class="tfg-main-content">
				<div class="tfg-section-header">
					<h2 class="tfg-section-title"><?php esc_html_e( 'Latest Technology Inquiries', 'techforgo' ); ?></h2>
					<span style="font-size: 12px; color: #666666;"><?php esc_html_e( 'Updated Daily by Senior Editors', 'techforgo' ); ?></span>
				</div>

				<?php
				$tfg_feed_query = new WP_Query(
					array(
						'posts_per_page'      => 6,
						'post_status'         => 'publish',
						'post__not_in'        => $featured_post_ids,
						'ignore_sticky_posts' => true,
					)
				);

				if ( $tfg_feed_query->have_posts() ) :
					?>
					<div class="tfg-posts-grid">
						<?php
						while ( $tfg_feed_query->have_posts() ) :
							$tfg_feed_query->the_post();
							get_template_part( 'template-parts/content-card' );
						endwhile;
						wp_reset_postdata();
						?>
					</div>

					<div class="tfg-archive-cta-row">
						<a href="<?php echo esc_url( home_url( '/blog/' ) ); ?>" class="tfg-btn-secondary">
							<?php esc_html_e( 'Browse Complete 10-Post Journal Archive &rarr;', 'techforgo' ); ?>
						</a>
					</div>
				<?php else : ?>
					<p><?php esc_html_e( 'No recent articles discovered.', 'techforgo' ); ?></p>
				<?php endif; ?>
			</div>

			<!-- 30% Sidebar -->
			<?php get_sidebar(); ?>
		</div>

		<!-- 4. DEDICATED CATEGORY FEEDS SECTION -->
		<section class="tfg-category-feeds-section" style="margin-top: 56px; padding-top: 36px; border-top: 1px solid #E5E5E5; margin-bottom: 32px;">
			<div style="margin-bottom: 24px;">
				<span class="tfg-category-label" style="display: block; margin-bottom: 4px;"><?php esc_html_e( 'Topic Tracks', 'techforgo' ); ?></span>
				<h2 style="font-size: 22px; font-weight: 800; margin: 0; color: #1A1A1A;"><?php esc_html_e( 'Curated Discipline Feeds', 'techforgo' ); ?></h2>
			</div>

			<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
				<?php
				$feed_cats = array(
					'artificial-intelligence' => esc_html__( 'Artificial Intelligence', 'techforgo' ),
					'cloud-infrastructure'   => esc_html__( 'Cloud & DevOps', 'techforgo' ),
					'cybersecurity'          => esc_html__( 'Cyber Defense', 'techforgo' ),
				);

				foreach ( $feed_cats as $slug => $label ) :
					$cat_query = new WP_Query(
						array(
							'category_name'  => $slug,
							'posts_per_page' => 2,
							'post_status'    => 'publish',
						)
					);
					?>
					<div style="padding: 20px; background: #FAFAFA; border: 1px solid #E5E5E5; border-radius: 8px;">
						<div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #E5E5E5; padding-bottom: 10px; margin-bottom: 14px;">
							<h3 style="font-size: 14px; font-weight: 700; margin: 0; color: #1A1A1A;"><?php echo esc_html( $label ); ?></h3>
							<a href="<?php echo esc_url( home_url( '/category/' . $slug . '/' ) ); ?>" style="font-size: 11px; font-weight: 700; color: #0066CC;">
								<?php esc_html_e( 'View Track &rarr;', 'techforgo' ); ?>
							</a>
						</div>
						<div style="display: flex; flex-direction: column; gap: 12px;">
							<?php
							if ( $cat_query->have_posts() ) :
								while ( $cat_query->have_posts() ) :
									$cat_query->the_post();
									?>
									<div>
										<a href="<?php the_permalink(); ?>" style="font-size: 13px; font-weight: 600; color: #1A1A1A; display: block; margin-bottom: 4px; line-height: 1.35;">
											<?php the_title(); ?>
										</a>
										<span style="font-size: 11px; color: #666666;"><?php echo esc_html( get_the_date( 'M j, Y' ) ); ?> &middot; <?php echo esc_html( techforgo_reading_time() ); ?></span>
									</div>
									<?php
								endwhile;
								wp_reset_postdata();
							else :
								?>
								<p style="font-size: 12px; color: #666666; margin: 0;"><?php esc_html_e( 'Research papers in peer review.', 'techforgo' ); ?></p>
							<?php endif; ?>
						</div>
					</div>
				<?php endforeach; ?>
			</div>
		</section>

	</div>
</main>

<?php
get_footer();
