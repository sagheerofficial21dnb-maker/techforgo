<?php
/**
 * The template for displaying all single posts
 *
 * @package TechForGo
 * @since 1.0.0
 */

get_header();
?>

<main id="primary" class="tfg-site-main">
	<div class="tfg-container">

		<!-- Breadcrumb Navigation -->
		<?php get_template_part( 'template-parts/breadcrumbs' ); ?>

		<div class="tfg-layout-split">
			<div class="tfg-main-content">
				<?php
				while ( have_posts() ) :
					the_post();

					// Article Body
					get_template_part( 'template-parts/content-single' );

					// Social Share Bar
					?>
					<?php if ( is_active_sidebar( 'adsense-post-bottom' ) ) : ?>
						<div class="tfg-ad-placement-slot" style="margin: 32px 0;">
							<?php dynamic_sidebar( 'adsense-post-bottom' ); ?>
						</div>
					<?php endif; ?>

					<section class="tfg-share-bar" aria-label="<?php esc_attr_e( 'Share this article', 'techforgo' ); ?>">
						<span class="tfg-share-label"><?php esc_html_e( 'Share Insight:', 'techforgo' ); ?></span>
						<div class="tfg-share-buttons">
							<a href="https://twitter.com/intent/tweet?url=<?php echo rawurlencode( get_permalink() ); ?>&text=<?php echo rawurlencode( get_the_title() ); ?>" target="_blank" rel="noopener noreferrer" class="tfg-share-btn" aria-label="<?php esc_attr_e( 'Share on X', 'techforgo' ); ?>">
								<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
								<span>X / Twitter</span>
							</a>

							<a href="https://www.linkedin.com/sharing/share-offsite/?url=<?php echo rawurlencode( get_permalink() ); ?>" target="_blank" rel="noopener noreferrer" class="tfg-share-btn" aria-label="<?php esc_attr_e( 'Share on LinkedIn', 'techforgo' ); ?>">
								<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
								<span>LinkedIn</span>
							</a>

							<button type="button" class="tfg-share-btn tfg-copy-link-btn" data-url="<?php echo esc_url( get_permalink() ); ?>" aria-label="<?php esc_attr_e( 'Copy link to clipboard', 'techforgo' ); ?>">
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
								<span class="tfg-copy-text"><?php esc_html_e( 'Copy URL', 'techforgo' ); ?></span>
							</button>
						</div>
					</section>

					<?php
					// Author Box
					get_template_part( 'template-parts/author-box' );

					// Related Posts Query
					$categories = get_the_category();
					if ( ! empty( $categories ) ) :
						$cat_id = $categories[0]->term_id;
						$related_query = new WP_Query(
							array(
								'cat'                 => $cat_id,
								'post__not_in'        => array( get_the_ID() ),
								'posts_per_page'      => 3,
								'ignore_sticky_posts' => true,
							)
						);

						if ( $related_query->have_posts() ) :
							?>
							<section class="tfg-related-section" aria-label="<?php esc_attr_e( 'Related Publications', 'techforgo' ); ?>">
								<h3 class="tfg-section-title"><?php esc_html_e( 'Related Inquiries', 'techforgo' ); ?></h3>
								<div class="tfg-posts-grid tfg-related-grid">
									<?php
									while ( $related_query->have_posts() ) :
										$related_query->the_post();
										get_template_part( 'template-parts/content-card' );
									endwhile;
									wp_reset_postdata();
									?>
								</div>
							</section>
							<?php
						endif;
					endif;

					// Comments
					if ( comments_open() || get_comments_number() ) :
						comments_template();
					endif;

				endwhile;
				?>
			</div>

			<?php get_sidebar(); ?>
		</div>

	</div>
</main>

<?php
get_footer();
