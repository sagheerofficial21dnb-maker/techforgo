<?php
/**
 * The sidebar containing the main widget area
 *
 * @package TechForGo
 * @since 1.0.0
 */

if ( ! is_active_sidebar( 'sidebar-1' ) && false ) {
	return;
}
?>

<aside id="secondary" class="tfg-sidebar" aria-label="<?php esc_attr_e( 'Sidebar Content', 'techforgo' ); ?>">
	<?php if ( is_active_sidebar( 'sidebar-1' ) ) : ?>
		<?php dynamic_sidebar( 'sidebar-1' ); ?>
	<?php else : ?>
		<!-- Default Search Widget -->
		<section class="tfg-widget tfg-widget-search">
			<h3 class="tfg-widget-title"><?php esc_html_e( 'Search Insights', 'techforgo' ); ?></h3>
			<form role="search" method="get" class="tfg-search-form" action="<?php echo esc_url( home_url( '/' ) ); ?>">
				<div class="tfg-search-input-group">
					<input type="search" class="tfg-search-field" placeholder="<?php esc_attr_e( 'Search topics...', 'techforgo' ); ?>" value="<?php echo get_search_query(); ?>" name="s" />
					<button type="submit" class="tfg-search-button" aria-label="<?php esc_attr_e( 'Submit Search', 'techforgo' ); ?>">
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
					</button>
				</div>
			</form>
		</section>

		<!-- Default Recent Posts Widget with Thumbnails -->
		<section class="tfg-widget tfg-widget-recent">
			<h3 class="tfg-widget-title"><?php esc_html_e( 'Recent Dispatches', 'techforgo' ); ?></h3>
			<ul class="tfg-recent-posts-list">
				<?php
				$tfg_recent_posts = new WP_Query(
					array(
						'posts_per_page'      => 4,
						'post_status'         => 'publish',
						'ignore_sticky_posts' => true,
					)
				);

				if ( $tfg_recent_posts->have_posts() ) :
					while ( $tfg_recent_posts->have_posts() ) :
						$tfg_recent_posts->the_post();
						?>
						<li class="tfg-recent-post-item">
							<?php if ( has_post_thumbnail() ) : ?>
								<a href="<?php the_permalink(); ?>" class="tfg-recent-thumb-link" aria-hidden="true" tabindex="-1">
									<?php the_post_thumbnail( 'techforgo-thumb', array( 'class' => 'tfg-recent-thumb' ) ); ?>
								</a>
							<?php endif; ?>
							<div class="tfg-recent-post-info">
								<h4 class="tfg-recent-title">
									<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
								</h4>
								<div class="tfg-recent-meta">
									<time datetime="<?php echo esc_attr( get_the_date( DATE_W3C ) ); ?>"><?php echo esc_html( get_the_date( 'M j, Y' ) ); ?></time>
								</div>
							</div>
						</li>
						<?php
					endwhile;
					wp_reset_postdata();
				else :
					?>
					<li><?php esc_html_e( 'No dispatches recorded yet.', 'techforgo' ); ?></li>
				<?php endif; ?>
			</ul>
		</section>

		<!-- Default Categories Widget -->
		<section class="tfg-widget tfg-widget-categories">
			<h3 class="tfg-widget-title"><?php esc_html_e( 'Research Disciplines', 'techforgo' ); ?></h3>
			<ul class="tfg-categories-list">
				<?php
				$categories = get_categories(
					array(
						'orderby'    => 'count',
						'order'      => 'DESC',
						'hide_empty' => false,
						'number'     => 6,
					)
				);

				if ( ! empty( $categories ) ) :
					foreach ( $categories as $category ) :
						?>
						<li class="tfg-category-item">
							<a href="<?php echo esc_url( get_category_link( $category->term_id ) ); ?>" class="tfg-category-link">
								<span class="tfg-category-name"><?php echo esc_html( $category->name ); ?></span>
								<span class="tfg-category-count"><?php echo esc_html( $category->count ); ?></span>
							</a>
						</li>
						<?php
					endforeach;
				else :
					?>
					<li class="tfg-category-item"><a href="<?php echo esc_url( home_url( '/category/artificial-intelligence/' ) ); ?>" class="tfg-category-link"><span class="tfg-category-name">Artificial Intelligence</span><span class="tfg-category-count">18</span></a></li>
					<li class="tfg-category-item"><a href="<?php echo esc_url( home_url( '/category/cloud-infrastructure/' ) ); ?>" class="tfg-category-link"><span class="tfg-category-name">Cloud & DevOps</span><span class="tfg-category-count">14</span></a></li>
					<li class="tfg-category-item"><a href="<?php echo esc_url( home_url( '/category/cybersecurity/' ) ); ?>" class="tfg-category-link"><span class="tfg-category-name">Cyber Defense</span><span class="tfg-category-count">11</span></a></li>
					<li class="tfg-category-item"><a href="<?php echo esc_url( home_url( '/category/hardware-architecture/' ) ); ?>" class="tfg-category-link"><span class="tfg-category-name">Hardware & Silicon</span><span class="tfg-category-count">9</span></a></li>
				<?php endif; ?>
			</ul>
		</section>

		<!-- Editorial Briefing / Newsletter Widget -->
		<section class="tfg-widget tfg-widget-newsletter">
			<h3 class="tfg-widget-title"><?php esc_html_e( 'Weekly Technical Dispatch', 'techforgo' ); ?></h3>
			<p class="tfg-newsletter-desc">
				<?php esc_html_e( 'Deep architectural teardowns and hardware benchmark analyses delivered directly to your inbox every Thursday morning.', 'techforgo' ); ?>
			</p>
			<form class="tfg-newsletter-form" onsubmit="event.preventDefault(); alert('Subscribed to TechForGo Technical Dispatch.');">
				<input type="email" required placeholder="<?php esc_attr_e( 'Enter your work email...', 'techforgo' ); ?>" class="tfg-newsletter-input" />
				<button type="submit" class="tfg-newsletter-btn"><?php esc_html_e( 'Subscribe Free', 'techforgo' ); ?></button>
			</form>
		</section>
	<?php endif; ?>
</aside>
